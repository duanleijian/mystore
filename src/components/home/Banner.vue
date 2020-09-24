<template>
  <div id="banner">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item,index) of imgs" :key="index">
        <img :src="item.img" alt="无法显示该图片">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Banner',
  props: {
    imgs: Array
  },
  data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          }
        }
      }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style lang="scss" scoped>
/deep/ .van-stepper__plus{
    background-color: #8fc321;
    color: #fff;
}
/deep/ .van-stepper__minus{
    background-color: #8fc321;
    color: #fff;
} 
/deep/.van-stepper__minus--disabled{
    background-color: #e8e8e8;
}
/deep/ .swiper-pagination-bullet-active{
    background-color: #8fc321;
}
#banner{
  width: 100%;
  padding: 0 0.2rem;
  box-sizing: border-box;
  img{
    display: block;
    width: 100%;
    border-radius: 0.1rem;
  }
}
</style>