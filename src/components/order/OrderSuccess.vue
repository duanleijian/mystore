<template>
    <div id="order-success">
        <common-header ref="header"></common-header>
        <div class="order-info">
            <div class="order-icon">
                <img src="~@/assets/img/order_success.png" alt="无法显示该图片">
                <span>下单成功</span>
            </div>
            <div class="order-detail">
                <span>订单编号: <span class="order-no">{{$route.query.order_no}}</span></span>
                <span>订单金额: <span class="order-money">￥{{$route.query.money}}</span></span>
            </div>
            <span class="tips">您的订单已成功提交，请等待平台发货</span>
            <button @click="$router.push('/order-detail/' + $route.query.order_id)">查看订单</button>
            <button @click="$router.push('/home')">返回商城</button>
        </div>
    </div>
    
</template>
<script>
import CommonHeader from '../../components/common/Header'
export default {
    name: 'OrderSuccess',
    components: {
        CommonHeader
    },
    mounted() {
        this.$refs.header.isReturn = true
        this.$refs.header.content = this.$route.meta.title
    },
    data() {
        return {
            
        }
    }
}
</script>
<style lang="scss" scoped>
#order-success{
    font-size: 0;
    .order-info{
        font-size: 0;
        margin-top: 1.2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .order-icon{
            display: flex;
            flex-direction: column;
            img{
                width: 1.5rem;
                height: 1.5rem;
            }
            span{
                padding-top: 0.3rem;
                font-size: 0.36rem;
                color: #8fc321;
            }
        }
        .order-detail{
            padding: 0 0.4rem;
            box-sizing: border-box;
            width: 100%;
            margin-top: 0.6rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            span{
                font-size:0.28rem;
                color: #999999;
                .order-no{
                    color: #333333 !important;
                }
                .order-money{
                    color: #ef8203 !important;
                }   
            }
        }
        .tips{
            padding-top: 0.35rem;
            span{
                font-size: 0.32rem;
                color: #666666;
            }
        }
        button{
            margin-top: 0.6rem;
            width: 3rem;
            height: 0.7rem;
            font-size: 0.32rem;
            color: #fff;
            background-color: #8fc321;
        }
        button:last-child{
            margin-top: 0.15rem;
        }
    }
}

</style>