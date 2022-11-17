import Vue from 'vue'
import App from './App.vue'
// 全局组件
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
import { MessageBox } from 'element-ui';
// 全局组件:第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
// ElementUI注册组件的另一种写法,挂载原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from '@/router'
// 引入仓库
import store from './store'
// 引入MockServer.js---mock数据
import '@/mock/mockServe'
import 'swiper/swiper-bundle.min.css'

Vue.config.productionTip = false

// 统一接口api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api'
import ws from '@/assets/images/1.jpg'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'

// 引入验证表单文件
import '@/plugins/validate'

Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: ws
})

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由：kv一致,省略v(router小写)
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库:组件实例身上会多一个属性$store属性
  store
}).$mount('#app')
