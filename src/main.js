import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ShopCar from './storage/buyCat'
import api from './utils/api'
import './assets/css/app.css'
import './assets/css/reset.css'
import './assets/css/currency.css'
import './assets/css/border.css'
import './utils/calculate.js'
Vue.config.productionTip = false
//vue-infinite-scroll 插件的全局配置
import infiniteScroll from 'vue-infinite-scroll'
import vueInfiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
Vue.use(vueInfiniteScroll)
//vant插件的全局配置
import { SwipeCell, Button, Cell, Empty, Dialog, Stepper, Toast, Uploader, AddressEdit, CouponCell, CouponList, Popup} from 'vant'

Vue.use(SwipeCell)
Vue.use(Button)
Vue.use(Cell)
Vue.use(Empty)
Vue.use(Dialog)
Vue.use(Stepper)
Vue.use(Toast)
Vue.use(Uploader)
Vue.use(AddressEdit)
Vue.use(CouponCell)
Vue.use(CouponList)
Vue.use(Popup)
//业务代码或者工具类
Vue.prototype.$cat = ShopCar
Vue.prototype.$api = api
Vue.prototype.$temporary = new Map()
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
