<template>
    <div id="coupon-list">
        <common-header ref="header"></common-header>
        <ul>
            <li v-for="(item,index) of couponList" :key="index">
                <div class="left">
                    <img src="~@/assets/img/coupon-bg.png" alt="无法显示该图片">
                    <span>￥{{item.money}}</span>
                </div>
                <div class="center">
                    <span>{{item.money}}兑换卷</span>
                    <span>有效期到{{item.expire}}</span>
                    <span>{{item.desc}}</span>
                </div>
                <button v-if="!item.isReceive" class="deactive">已经领取</button>
                <button v-if="item.isReceive" class="active" @click="receiveCoupon(index)">立即领取</button>
            </li>
        </ul>
    </div>
</template>
<script>
import CommonHeader from '../common/Header'
import { Toast } from 'vant'
import LoginRegister from '../../storage/LoginRegister'
import dateFormat from '../../utils/dateFormat'
export default {
    name: 'CouponList',
    created() {
        if (!LoginRegister.hasLoginInfo()) {
            this.$router.push("/login");
        } else {
            this.getCouponList()
        }
    },
    mounted() {
        this.$refs.header.isReturn = true
        this.$refs.header.content = '优惠卷'
    },
    data() {
        return {
            couponList: [],
            userCoupons: []
        }
    },
    components: {
        CommonHeader
    },
    methods: {
        async getCouponList() {
            let userCoupons = await this.$api.getUserCoupon(LoginRegister.getLoginInfo().token)
            let res = await this.$api.getCoupon()
            console.log('data1', userCoupons);
            console.log('data2', res);
            if (userCoupons.data.error_msg === 'ok') {
                this.userCoupons = userCoupons.data.data.coupon
            }
            if (res.data.error_msg === 'ok') {
                this.couponList = res.data.data.map((item) => {
                    item.money = parseInt(item.money)
                    item.limit_total = parseInt(item.limit_total)
                    item.desc = item.limit_total > 0?  `满` +item.limit_total + `元使用` : `无门槛使用`
                    item.expire = dateFormat('YYYY/mm/dd', new Date(Date.now() + item.time * 1000 * 60 * 60 * 24))
                    item.isReceive = this.isRevice(item, this.userCoupons)
                    return item
                })
                console.log('data2', this.couponList);
                Toast.success('用户优惠卷数据请求成功')
            }
            
        },
        dataFormat(time) {
            return dateFormat('YYYY/mm/dd', new Date(time + new Date().getTime()))
        },
        CouponLimitText(val) {
            return parseInt(val) > 0 ? "满" + parseInt(val) + "元使用" : "无门槛使用";
        },
        isRevice(target, userCoupons) {
            let num = 0
            userCoupons.forEach((item) => {
                if (item.coupon_id == target.id) {
                    num++
                }
            })
            return target.max_num > num
        },
        async receiveCoupon(index) {      
            let res = await this.$api.receive(LoginRegister.getLoginInfo().token, this.couponList[index].id);
            if (res.data.error_msg === "ok") {
                let userCoupons = await this.$api.getUserCoupon(LoginRegister.getLoginInfo().token)
                this.userCoupons = [...userCoupons.data.data.coupon]
                this.couponList[index].isReceive = this.isRevice(this.couponList[index], this.userCoupons)
                Toast.success("领取成功!");
            } else {
                Toast.fail("领取失败!");
            }  
        }
    }
}
</script>
<style lang="scss" scoped>
#coupon-list{
    font-size: 0;
    ul{
        display: flex;
        flex-direction: column;
        li{
            padding: 0.2rem;
            box-sizing: border-box;
            position: relative;
            display: flex;
            flex-direction: row;
            .left{
                position: relative;
                img{
                    width: 2.3rem;
                    display: block;
                }
                span{
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    font-size: 0.6rem;
                    color: #fff;
                }
            }
            .center{
                padding-left: 0.2rem;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                span{
                    padding-bottom: 0.15rem;
                    font-size: 0.28rem;
                    color: #666666;
                }
                
                span:last-child{
                    position: absolute;
                    bottom: 0.05rem;
                    color: #ef8203;
                }
            }
            button{
                position: absolute;
                top: 50%;
                right: 0.2rem;
                margin-top: -0.3rem;
                width: 1.4rem;
                height: 0.6rem;
                font-size: 0.26rem;
                border: 1px solid #8fc321;
                border-radius: 1rem;

            }
            button.active{
                background-color: #8fc321;
                color: #fff;
            }
            button.deactive{
                background-color: #fff;
                color: #8fc321;
            }
        }
    }
}
</style>