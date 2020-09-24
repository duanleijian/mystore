import VueRouter from 'vue-router'
import Vue from 'vue'
import LoginRegister from '../storage/LoginRegister'
Vue.use(VueRouter)
let routes = [
    {
        path: '/',
        redirect: 'home',
        meta: {
            title: '首页',
            toPath: '',
            requireLogin: false
        }
    },
    {
        path: '/home',
        component: () => import('../pages/Home.vue'),
        meta: {
            title: '首页',
            toPath: '',
            requireLogin: false
        }
    },
    {
        path: '/good-category',
        component: () => import('../pages/GoodCategory.vue'),
        meta: {
            title: '商品分类',
            toPath: '',
            requireLogin: false
        }
    },
    {
        path: '/shopcat',
        component: () => import('../pages/ShopCat.vue'),
        meta: {
            title: '购物车',
            toPath: '',
            requireLogin: true
        }
    },
    {
        path: '/good-detail',
        component: () => import('../pages/GoodDetail.vue'),
        meta: {
            title: '商品详情',
            toPath: '',
            requireLogin: false
        }
    },
    {
        path: '/login',
        component: () => import('../components/profile/Login.vue'),
        meta: {
            title: '登录',
            toPath: '/profile',
            requireLogin: false,
            redirect: false
        }
    },
    {
        path: '/register',
        component: () => import('../components/profile/Register.vue'),
        meta: {
            title: '注册',
            toPath: '',
            requireLogin: false
        }
    },
    {
        path: '/profile',
        component: () => import('../pages/Profile.vue'),
        meta: {
            title: '个人中心',
            toPath: '',
            requireLogin: false
        }
    },
    {
        path: '/address',
        component: () => import('../pages/Address.vue'),
        meta: {
            title: '收货地址',
            toPath: '',
            requireLogin: true
        }
    },
    {
        path: '/address-add',
        component: () => import('../components/address/AddressAdd.vue'),
        meta: {
            title: '添加地址',
            toPath: '',
            requireLogin: true
        }
    },
    {
        path: '/address-edit',
        component: () => import('../components/address/AddressEdit.vue'),
        meta: {
            title: '编辑地址',
            toPath: '',
            requireLogin: true
        }
    },
    {
        path: '/coupon',
        component: () => import('../components/coupon/Coupon.vue'),
        meta: {
            title: '我的优惠卷',
            toPath: '',
            requireLogin: true
        }
    },
    {
        path: '/coupon-list',
        component: () => import('../components/coupon/CouponList.vue'),
        meta: {
            title: '优惠卷',
            toPath: '',
            requireLogin: false
        }
    },
    {
        path: '/my-coupon',
        component: () => import('../components/coupon/MyCoupon.vue'),
        meta: {
            title: '我的卡卷',
            toPath: '',
            requireLogin: true
        }
    },
    {
        path: '/order-submit',
        component: () => import('../components/order/OrderSubmit.vue'),
        meta: {
            title: '确认订单',
            toPath: '',
            requireLogin: true   
        }
    },
    {
        path: '/order-success',
        component: () => import('../components/order/OrderSuccess.vue'),
        meta: {
            title: '下单成功',
            toPath: '',
            requireLogin: true
        }
    },
    {
        path: '/order-detail/:id',
        component: () => import('../components/order/Orderdetail.vue'),
        meta: {
            title: '订单详情',
            toPath: '',
            requireLogin: true
        }
    },
    {
        path: '/order-list',
        component: () => import('../components/order/OrderList.vue'),
        meta: {
            title: '我的订单',
            toPath: '',
            requireLogin: true
        }
    },
    {
        path: '/collect',
        component: () => import('../pages/Collect.vue'),
        meta: {
            title: '我的收藏',
            toPath: '',
            requireLogin: true
        }

    },
    {
        path: '/foot-mark',
        component: () => import('../pages/FootMark.vue'),
        meta: {
            title: '我的足迹',
            toPath: '',
            requireLogin: true
        }
    }
]
const router = new VueRouter({
    routes,
    mode: 'history'
});
router.beforeEach((to, from ,next) => {
    // console.log('from',from.path);
    // console.log('to', to.path);
    if (to.meta.requireLogin && !LoginRegister.hasLoginInfo()) {
        routes.forEach((item) => {
            if (item.path.endsWith('login')) {
                item.meta.toPath = to.path
            }      
        })
        next('/login?redirect=' + to.path)
    } else {
        next()
    }
    next() 
    
})
export default router