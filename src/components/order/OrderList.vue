<template>
    <div id="order-list">
        <common-header ref="header"></common-header>
        <tab-bar @getTabIndex="getTabIndex">
            <tab-bar-item @getTabIndex="getTabIndex">
                <span slot="item-text" class="item-text">全部</span>
            </tab-bar-item>
            <tab-bar-item @getTabIndex="getTabIndex">
                <span slot="item-text" class="item-text">待发货</span>
            </tab-bar-item>
            <tab-bar-item @getTabIndex="getTabIndex">
                <span slot="item-text" class="item-text">待收货</span>
            </tab-bar-item>
            <tab-bar-item @getTabIndex="getTabIndex">
                <span slot="item-text" class="item-text">已完成</span>
            </tab-bar-item>
            <tab-bar-item @getTabIndex="getTabIndex">
                <span slot="item-text" class="item-text">已评论</span>
            </tab-bar-item>
        </tab-bar>
        <div class="order-info-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <ul>
                <li v-for="(item, index) of orderList" :key="index" @click="toOrderDetail(index)">
                    <div class="order-no">
                        <span>订单编号:{{item.order_no}}</span>
                        <span>{{getStatusText(item.status)}}</span>
                    </div>
                    <div class="order-good">
                        <img :src="item.goods[0].goods_img" alt="无法显示该图片">
                        <div class="other-info">
                            <span class="good-name">{{item.goods[0].goods_name}}</span>
                            <div class="good-price-count">
                                <span>￥{{item.goods[0].goods_price}}</span>
                                <span>X{{item.goods[0].buy_number}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="order-time-money">
                        <span>时间: {{getTime(item)}}</span>
                        <span>共计{{item.goods[0].buy_number}}件</span>
                        <span>￥{{getTotalPrice(item)}}</span>
                    </div>
                    <div class="order-action"></div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import CommonHeader from '../../components/common/Header'
import TabBar from '../../components/common/tab_bar/TabBar'
import TabBarItem from '../../components/common/tab_bar/TabBarItem'
import LoginRegister from '../../storage/LoginRegister'
import config from '../../config'
import dataFormat from '../../utils/dateFormat'
import { Toast } from 'vant'
export default {
    name: 'OrderList',
    components: {
        TabBar,
        TabBarItem,
        CommonHeader
    },
    created() {

    },
    mounted() {
        this.$refs.header.isReturn = true
        this.$refs.header.content = this.$route.meta.title
    },
    data() {
        return {
            orderList: [],
            orderInfo: {
                status: 0,
                page: 1,
                count: 5,
                totalPages: 1
            },
            busy: false,
            isInitLoad: false
        }
    },
    computed: {
        
    },
    methods: {
        getTabIndex(index) {
            this.isInitLoad = false
            this.orderInfo.status = index
            this.orderList = []
            this.getOrderList(this.orderInfo.status, this.orderInfo.status.page, this.orderInfo.count)
        },
        loadMore() {
            if (this.isInitLoad) {
                if (this.orderInfo.page + 1 <= this.orderInfo.totalPages) {
                    this.getOrderList(this.orderInfo.status, ++this.orderInfo.page, this.orderInfo.count)
                } else {
                    Toast('没有更多数据了!')
                }
            } else {
                this.isInitLoad = true
            }
            
        },
        async getOrderList(status = 0, page = 1, count = 4) {
            if (LoginRegister.hasLoginInfo()) {
                let res = await this.$api.getOrderList(LoginRegister.getLoginInfo().token, status, page, count)
                if (res.data.error_msg === 'ok') {
                    this.orderInfo.totalPages = Math.ceil(res.data.data.total / this.orderInfo.count)
                    // this.orderList.push(...res.data.data.list)
                    res.data.data.list.forEach(item => {
                        this.orderList.push(item)
                    })
                    console.log('orderlist', res);
                } else {
                    if (res.data.error_code == 4001) {
                        Toast.fail('请重新登录!')
                        this.$router.push('/login')
                    }
                    throw new Error('token过期或者失效',res.data.error_code)
                }
            } else {
                Toast.fail('token已过期或失效!')
                this.$router.push('/login')
            }
            
        },
        toOrderDetail(index) {
            this.$router.push('/order-detail/' + this.orderList[index].id)    
        },
        getStatusText(status) {
            return config.order.statusText[status]
        },
        getTime(item) {
            return dataFormat('YYYY.mm.dd', new Date(item.create_time * 1000))
        },
        getTotalPrice(item) {
            let sum = 0
            item.goods.forEach(el => {
                sum += el.goods_price * parseInt(el.buy_number)
            })
            sum -= item.coupon_money
            return sum
        }
    }
}
</script>
<style lang="scss" scoped>
#order-list{
    width: 100%;
    height: 100%;
    // overflow: hidden;
    .order-info-list{
        height: calc(100% - 1.68rem);
        padding:0 0.2rem;
        box-sizing: border-box;
        font-size: 0;
        overflow: auto;
        ul{
            
            display: flex;
            flex-direction: column;
            li{
                padding: 0.2rem;
                box-sizing: border-box;
                margin-top: 0.2rem;
                display: flex;
                flex-direction: column;
                background-color: #fff;
                .order-no{
                    height: 0.8rem;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    span{
                        font-size: 0.24rem;
                        color: #6b6b6b;
                    }
                }
                .order-good{
                    display: flex;
                    flex-direction: row;
                    img{
                        display: block;
                        width: 1.8rem;
                        height: 1.8rem;
                        border-radius: 0.05rem;
                        background-color: #bfbfbf;
                    }
                    .other-info{
                        padding-left: 0.2rem;
                        width: calc(100% - 1.8rem);
                        display: flex;
                        flex-direction: column;
                        .good-name{
                            padding-top: 0.25rem;
                            font-size: 0.28rem;
                            color: #2d2d2d;
                        }
                        .good-price-count{
                            padding-top: 0.8rem;
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
                .order-time-money{
                    padding-top: 0.25rem;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    span:first-child{
                        font-size: 0.24rem;
                        color: #6b6b6b;
                    }
                    span:nth-child(2) {
                        padding-right: 0.1rem;
                        flex-grow: 1;
                        text-align: right;
                        font-size: 0.24rem;
                        color: #6b6b6b;
                    }
                    span:last-child{
                        font-size: 0.24rem;
                        color: #ef8203;
                    }
                }
            }
        }
    }
}
</style>