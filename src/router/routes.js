/* 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，
这样就会更加高效。 */

export default [
    {
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: { show: true },
        // 二级路由组件
        children: [
            {
                path: 'myorder',
                component: () => import('@/pages/Center/myOrder')
            },
            {
                path: 'grouporder',
                component: () => import('@/pages/Center/groupOrder')
            },
            // 路由重定向
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: { show: true }
    },
    {
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == "/trade") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页，必须从购物车而来
            if (from.path == "/shopcart") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        name: 'addcartsuccess',
        meta: { show: true }
    },
    {
        path: '/detail/:skuid',
        component: () => import('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: '/search/:keyword?',
        name: 'search',
        component: () => import('@/pages/Search'),
        meta: { show: true }
    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: { show: false }
    },
    // 重定向，在项目跑起来的时候，访问/,立马让他定向到首页
    {
        path: '/',
        redirect: '/home'
    }
]