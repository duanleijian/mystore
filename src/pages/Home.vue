<template>
    <div id="home">
        <common-header></common-header>
        <search></search>
        <banner :imgs="imgList"></banner>
        <navigate :navs="navigates"></navigate>
        <coupon :couponList="couponList"></coupon>
        <good :goods="goodRecommonds"></good>
        <nav-bar></nav-bar>   
    </div>
</template>
<script>
import dataFormat from '../utils/dateFormat'
import CommonHeader from '../components/common/Header'
import Search from '../components/home/Search'
import Banner from '../components/home/Banner'
import Navigate from '../components/home/Navigate'
import Good from '../components/home/Good'
import NavBar from '../components/common/NavBar'
import Coupon from '../components/coupon/Coupon'
export default {
    name: 'Home',
    created() {
      this.getSwiper()
      this.getNavigate()
      this.getCoupon()
      this.getGoodRecommond()       
    },
    data() {
      return {
        imgList: [],
        navigates: [],
        goodRecommonds: [],
        couponList: []
      }
    },
    methods: {
      async getSwiper() {
        const data1 = await this.$api.getSwiper()
        console.log('轮播图资源请求完成',data1);
        if (data1.data.error_msg === 'ok') {
            this.imgList = [...data1.data.data]
        }
      },
      async getNavigate() {
        const data2 = await this.$api.getNavigate()
        console.log('导航栏资源请求完成',data2);
        if (data2.data.error_msg === 'ok') {
            this.navigates = [...data2.data.data]
        }
      },
      async getCoupon() {
        const data3 = await this.$api.getCoupon()
        console.log('兑换卷资源请求完成', data3);
        if (data3.data.error_msg === 'ok') {
            data3.data.data = data3.data.data.map((item) => {
              item.money = parseInt(item.money)
              item.limit_total = parseInt(item.limit_total)
              item.desc = item.limit_total > 0?  `满${item.limit_total}元使用` : `无门槛使用`
              item.expire = dataFormat('YYYY/mm/dd', new Date(Date.now() + item.time * 1000 * 60 * 60 * 24))
              return item
            })
            this.couponList = [...data3.data.data.slice(0, 2)]
        }
      },
      async getGoodRecommond() {
        const data4 = await this.$api.getGoodRecommond()
        console.log('商品推荐资源请求完成',data4);
        if (data4.data.error_msg === 'ok') {
            this.goodRecommonds = data4.data.data
        }
      }
    },
    components: {
      CommonHeader,
      Search,
      Banner,
      Navigate,
      Good,
      NavBar,
      Coupon
    }
}
</script>
<style scoped>

</style>