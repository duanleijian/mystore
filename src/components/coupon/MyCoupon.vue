<template>
    <div id="my-coupon">
        <common-header ref="header"></common-header>
        <div class="coupon-list">
            <ul>
                <li v-for="(item, index) in myCoupons" :key="index">
                    <div class="left">
                        <div class="top">
                            <span class="iconfont icon-renminbi"></span>
                            <span>{{parseInt(item.money)}}</span>
                            <span>优惠卷</span>
                        </div>
                        <div class="bottom">
                            <span>{{getDataSE(item)}}</span>
                        </div>
                    </div>
                    <div class="right">
                        <h3>{{getStatusText(item)}}</h3>
                    </div>
                    <img :src="getBackImg(item)" alt="无法显示该图片">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import dateFormat from '../../utils/dateFormat'
import CommonHeader from '../../components/common/Header'
import LoginRegister from '../../storage/LoginRegister'
export default {
    name: 'MyCoupon',
    created() {
        this.getMyCoupons()
    },
    mounted() {
        this.$refs.header.isReturn = true
        this.$refs.header.content = '我的卡卷'
    },
    data() {
        return {
            myCoupons: []
        }    
    },
    components: {
        CommonHeader
    },
    methods: {
        async getMyCoupons() {
            let res = await this.$api.getUserCoupon(LoginRegister.getLoginInfo().token)
            console.log('myCoupons', res);
            if (res.data.error_msg === 'ok') {
                this.myCoupons = res.data.data.coupon
            }
        },
        getBackImg(item = null) {
            let backImg = ''
            if (item.is_use) {
                backImg = require('../../assets/img/2.jpg')
            } else {
                backImg = require('../../assets/img/1.jpg')
            }
            return backImg
        },
        getDataSE(item) {
            return dateFormat('YYYY.mm.dd', new Date(item.get_time * 1000)) + '-' + dateFormat('YYYY.mm.dd', new Date(item.expires_time * 1000))
        },
        getStatusText(item) {
            if (item.expires_time * 1000 < Date.now()) {
                return '已经失效'
            } else if(item.is_use){
                return '已经使用'
            } else {
                return '优惠抵扣'
            }

        }
    }
}
</script>
<style lang="scss" scoped>
#my-coupon{
    .coupon-list{
        width: 5.8rem;
        margin: 0 auto;
        font-size: 0;
        ul{
            display: flex;
            flex-direction: column;
            li{
                padding: 0.2rem;
                box-sizing: border-box;
                position: relative;
                margin-top: 0.36rem;
                height: 2.35rem;
                display: flex;
                flex-direction: row;
                img{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                }
                .left{
                    
                    width: 3rem;
                    height: 2rem;
                    display: flex;
                    flex-direction: column;
                    .top{
                        position: relative;
                        padding-top: 0.6rem;
                        padding-left: 0.5rem;
                        display: flex;
                        flex-direction: row;
                        span:first-child{
                            font-size: 0.35rem;
                            color: #ffffff;
                        }
                        span:nth-child(2){
                            font-size: 0.48rem;
                            color: #ffffff;
                        }
                        span:last-child{
                            position: absolute;
                            right: 0.5rem;
                            bottom: 0.06rem;
                            font-size: 0.32rem;
                            color: #ffffff;
                        }
                    }
                    .bottom{
                        padding-top: 0.45rem;
                        text-align: center;
                        font-size: 0.22rem;
                        color: #ffffff;
                        
                    }
                }
                .right{
                    position: relative;
                    margin-left: 0.4rem;
                    width: 2rem;
                    height: 2rem;
                    h3{
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        width: 1rem;
                        height: 1rem;
                        text-align: center;
                        font-weight: 600;
                        font-size: 0.47rem;
                        color: #ff5e46;
                    }
                }
            }
        }
    }
}
</style>