// 配置路由
import Vue from "vue";
// 引入vue-router路由插件
import VueRouter from "vue-router";
import routes from './routes'
// 使用插件
Vue.use(VueRouter)

// 引入store
import store from '@/store'
// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push/replace方法
// 第一个参数，告诉原来push方法，往哪里跳(传递哪些参数)
// 第二个参数：成功的回调
// 第三个参数：失败的回调
// call 和 apply 区别
// 相同点：都可以调用函数一次，都可以改函数的上下文一次
// 不同点：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
// 配置路由
let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

// 全局守卫，前置路由(在路由跳转之前进行判断)
router.beforeEach(async (to, from, next) => {
    // to:去哪个路由
    // from:来自哪个路由
    // next:放行函数
    // next()
    // 获取仓库中的token----确认用户已经登录
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    // 判断用户是否登录
    if (token) {
        // 已经登录就得阻止用户再去登录
        if (to.path == "/login" || to.path == "/register") {
            next('/')
        } else {
            // 访问得是非登录与注册
            if (name) {
                next()
            } else {
                try {
                    // 登录了没有用户信息
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效重新登录
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 用户未登录:不能去交易相关，不能去支付相关，不能去个人中心
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath)
        } else {
            next()
        }
    }
})

export default router