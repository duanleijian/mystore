<template>
  <div id="coupon">
    <div v-for="(item,index) of couponList" :key="index" class="coupon-item" @click="toCouponList">
      <div class="quota">
        <span class="iconfont icon-renminbi"></span>
        <h3>{{parseInt(item.money)}}</h3>
        <span class="coupon-font">优惠卷</span>
      </div>
      <span class="limit">{{CouponLimitText(item.limit_total)}}</span>
      <button @click.stop="receiveCoupon(index)">立即领取</button>
      <img src="~@/assets/img/index-coupon-bg.png" alt="无法显示该图片" />
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import LoginRegister from '../../storage/LoginRegister'
export default {
  name: "Coupon",
  props: {
    couponList: Array,
  },
  data() {
    return {};
  },
  methods: {
    CouponLimitText(val) {
      return parseInt(val) > 0 ? "满" + parseInt(val) + "元使用" : "无门槛使用";
    },
    async receiveCoupon(index) {
      if (!LoginRegister.hasLoginInfo()) {
        this.$router.push("/login");
      } else {
        console.log('token', LoginRegister.getLoginInfo().token);
        const id = this.couponList[index].id
        let res = await this.$api.receive(LoginRegister.getLoginInfo().token,id);
        if (res.data.error_msg === "ok") {
          Toast.success("领取成功!");
        } else {
          Toast.fail("领取失败!");
        }
      }
    },
    toCouponList() {
      this.$router.push({path: '/coupon-list', query: {couponList: this.couponList}})
    }
  }
};
</script>
<style lang="scss" scoped>
#coupon {
  padding: 0rem 0.2rem;
  margin-bottom: 0.3rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0;
  color: #8fc321;
  .coupon-item {
    position: relative;
    padding: 0.2rem 0.6rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 48%;
    height: 2.08rem;
    .quota {
      display: flex;
      flex-direction: row;
      .iconfont {
        font-size: 0.2rem;
      }
      h3 {
        align-self: flex-end;
        font-weight: normal;
        font-size: 0.6rem;
      }
      .coupon-font {
        padding-left: 0.05rem;
        align-self: flex-end;
        font-size: 0.3rem;
      }
    }
    .limit {
      margin-top: 0.2rem;
      align-self: center;
      font-size: 0.2rem;
    }
    button {
      margin-top: 0.2rem;
      align-self: center;
      width: 1.2rem;
      height: 0.4rem;
      color: #fff;
      font-size: 0.2rem;
      background-color: #8fc321;
      border-radius: 1rem;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: -1;
    }
  }
}
</style>