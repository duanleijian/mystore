<template>
    <div id="order-detail">
        <common-header ref="header"></common-header>
        <div class="back" v-if="orderDetail">
            <span class="iconfont icon-jinggao"></span>
            <span>{{getStatusText(orderDetail.status)}}</span>
        </div>
        <div class="order-address" v-if="orderDetail">
            <div class="user-info">
                <span>收货人: {{orderDetail.address.name}}</span>
                <span>{{orderDetail.address.phone}}</span>
            </div>
            <div class="user-address">
                <span class="iconfont icon-dizhi2"></span>
                <span>{{orderDetail.address.province + orderDetail.address.city + orderDetail.address.area + orderDetail.address.address}}</span>
            </div>
        </div>
        <div class="order-good" v-if="orderDetail">
            <div class="good-all-info">
                <img :src="orderDetail.snap_img" alt="无法显示该图片">
                <div class="good-info">
                    <span class="good-name">{{orderDetail.goods[0].goods_name}}</span>
                    <div class="good-price-count">
                        <span class="good-price">￥{{orderDetail.goods[0].goods_price}}</span>
                        <span class="good-count">X{{orderDetail.goods[0].buy_number}}</span>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="order-info" v-if="orderDetail">
            <p class="order-no">
                <span>订单号:</span>
                <span>{{orderDetail.order_no}}</span>
            </p>
            <p class="order-create-time">
                <span>下单时间</span>
                <span>{{timeFormat(orderDetail.create_time)}}</span>
            </p>
            <p class="order-delivery-time">
                <span>发货时间</span>
                <span>{{timeFormat(orderDetail.create_time + 60 * 60 * 8)}}</span>
            </p>
        </div>
    </div>
    
    
</template>
<script>
import CommonHeader from '../../components/common/Header'
import LoginRegister from '../../storage/LoginRegister'
import config from '../../config'
import { CellGroup } from 'vant'
import dateFormat from '../../utils/dateFormat'
export default {
    name: 'OrderDetail',
    components: {
        CommonHeader
    },
    data() {
        return {
            orderDetail: null
        }
    },
    created() {
        this.getOrderDetail()
    },
    mounted() {
        console.log('ref', this.$refs.header);
        this.$refs.header.isReturn = true
        this.$refs.header.content = this.$route.meta.title
    },
    methods: {
        async getOrderDetail() {
            let res = await this.$api.getOrderDetail(LoginRegister.getLoginInfo().token, this.$route.params.id)
            console.log('res', res);
            if (res.data.error_msg === 'ok') {
                this.orderDetail = res.data.data.order
            } else {
                throw new Error(res.data.error_msg)
            }
        },
        getStatusText(status) {
            return config.order.statusText[status]
        },
        timeFormat(times) {
            return dateFormat('YYYY-mm-dd HH:MM:SS', new Date(times * 1000))
        }
    }
}
</script>
<style lang="scss" scoped>
#order-detail{
    font-size: 0;
    .back{
        padding-top: 0.4rem;
        padding-left: 0.3rem;
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 2.1rem;
        background-color: #8fc321;
        span{
            height: 0.5rem;
        }
        span:first-child{
            font-size: 0.5rem;
            color: #ffffff;
        }
        span:last-child{
            padding-left: 0.2rem;
            line-height: 0.5rem;
            font-size: 0.32rem;
            color: #ffffff;
        }
    }
    .order-address{
        margin-top: -1rem;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        width: 6.9rem;
        height: 2rem;
        background-color: #fff;
        .user-info{
            padding-left: 0.7rem;
            padding-right: 0.3rem;
            height: 0.95rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            span:first-child{
                font-size: 0.28rem;
                color: #1a1a1a;
            }
            span:last-child{
                font-size: 0.28rem;
                color: #1a1a1a;
            }
        }
        .user-address{
            padding-left: 0.3rem;
             padding-right: 0.65rem;
            display: flex;
            flex-direction: row;
            span:first-child{
                font-size: 0.28rem;
                color: #666666;
            }
            span:last-child{
                padding-left: 0.15rem;
                font-size: 0.28rem;
                color: #666666;
            }
        }
    }
    .order-good{
        margin-top: 0.2rem;
        padding: 0.4rem 0rem;
        background-color: #fff;
        .good-all-info{
            display: flex;
            flex-direction: row;
            padding-left: 0.6rem;
            padding-right: 0.45rem;
            box-sizing: border-box;
            img{
                width: 1.8rem;
                height: 1.8rem;
                border-radius: 0.05rem;
                background-color: #bfbfbf;
            }
            .good-info{
                padding-left: 0.2rem;
                width: 100%;
                display: flex;
                flex-direction: column;
                .good-name{
                    padding-top: 0.3rem;
                    width: 2.5rem;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 0.28rem;
                    color: #2d2d2d;
                }
                .good-price-count{
                    width: 100%;
                    padding-top: 1rem;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    span:first-child{
                    
                        font-size: 0.24rem;
                        color: #ef8203;
                    }
                    span:last-child{
                        font-size: 0.24rem;
                        color: #666666;
                    }
                }
            }
        }  
    }
    .order-info{
        margin-top: 0.2rem;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        p{
            padding: 0 0.2rem;
            box-sizing: border-box;
            height: 0.75rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            span {
                font-size: 0.28rem;
            }
            span:first-child{
                color: #999999;
            }
            span:last-child{
                color: #333333;
            }
        }
    }
}
</style>