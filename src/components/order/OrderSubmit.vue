<template>
    <div id="order-submit">
        <common-header ref="header"></common-header>
        <div class="receive-address" @click="selectDefaultAddress()" v-if="addressList.length > 0">
            <div class="text">
                <span class="iconfont icon-dizhi2"></span>
                <div class="address-info">
                    <div class="user-info">
                        <span>{{addressInfo.name}}</span>
                        <span>{{addressInfo.phone}}</span>
                    </div>
                    <span class="receive-address">{{addressInfo.address}}</span>
                </div>
                <span class="iconfont icon-youjiantou"></span>
            </div>
            <img :src="bcUrl" alt="无法显示该图片">
        </div>
        <div class="selected-good" v-if="shopList.length > 0">
            <ul>
                <li v-for="(item,index) of shopList" :key="index">
                    <img :src="item.img" alt="无法显示该图片">
                    <div class="detail-info">
                        <span class="good-name">{{item.name}}</span>
                        <div class="price-info">
                            <span>￥{{item.count * item.price}}</span>
                            <span>X{{item.count}}</span>
                        </div>  
                    </div>
                </li>
            </ul>
        </div>
        <div class="other-action" v-if="shopList.length > 0">
            <h2>
                <span>商品金额</span>
                <span>￥{{calcTotal()}}</span>
            </h2>
            <h3>
                <span>商品数量</span>
                <span>{{this.shopList.length}}</span>
            </h3>
            <van-coupon-cell  
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                @click="showList = !showList"
            />   
        </div>
        <address-slide ref="slide" :addressList="addressList" @getDefaultAddress="getDefaultAddress" ></address-slide>
        <van-popup
            v-model="showList"
            round
            position="bottom"
            style="height: 90%; padding-top: 4px;"
        >
            <van-coupon-list
                :show-exchange-bar="false"
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                :disabled-coupons="disabledCoupons"
                @change="onChange"
                @exchange="onExchange"
            />
        </van-popup>
        <div class="buy-action">
            <span>总金额:<span>￥{{calcTotal()}}</span></span>
            <span :class="{active: orderSubCondition}" @click="buyNow">立即购买</span>
        </div>
    </div>    
</template>
<script>
import CommonHeader from '../../components/common/Header'
import LoginRegister from '../../storage/LoginRegister'
import AddressSlide from '../order/AddressSlide'
import {Toast} from 'vant'
export default {
    name: 'OrderSubmit',
    components: {
        AddressSlide,
        CommonHeader
    },
    created() {
        this.getAddressList()
        this.getShopList()
        this.getCoupons()
    },
    mounted() {
        this.$refs.header.isReturn = true
        this.$refs.header.content = this.$route.meta.title
    },
    data() {
        return {
            bcUrl: require('../../assets/img/address-flag.png'),
            sildeBool: true,
            addressList: [],
            addressInfo: {
                address: '请选择收货地址',
                name: '',
                tel: '',
            },
            shopList: [],
            showList: false,
            chosenCoupon: -1,
            coupons: [],
            disabledCoupons: [],
            isSetDeafult: false,
            selectCoupon: null,
            selectAddress: null
        }
    },
    computed: {
        orderSubCondition() {
            return this.isSetDeafult && this.shopList.length > 0
        }
    },
    methods: {
        async payment() {
            if (this.selectCoupon && this.selectAddress) {
                let goods = this.shopList.map(item => {
                    return {
                        goods_id: item.id,
                        count: item.count
                    }  
                }), token = LoginRegister.getLoginInfo().token
                let data = {
                    goods,
                    address_id: this.selectAddress.id,
                    coupon_id: this.selectCoupon.coupon_id
                }
                let money = this.calcTotal()
                let res = await this.$api.addOrder(token, data)
                if (res.data.error_msg === 'ok') {
                    console.log('addOrder', res);
                    this.$cat.removeAll()
                    this.shopList = []
                    this.$router.push({path: '/order-success', query: {
                        order_id: res.data.data.order_id,
                        order_no: res.data.data.order_no,
                        create_time: res.data.data.create_time,
                        pass: res.data.data.pass,
                        money: money
                    }})
                } else {
                    if (res.data.error_code == '4001') {
                        Toast('请用户重新登录!')
                    }
                    throw new Error('订单添加失败!', res.data.error_msg + res.data.error_code)
                   
                }
            } else {
                Toast.fail('请设置默认地址或者选择优惠卷!')
            }
        },
        calcTotal() {
            let sum = 0;
            this.shopList.forEach(item => {
                sum += item.price * item.count
            })
            if (this.selectCoupon) {
                sum -= parseInt(this.selectCoupon.value) / 100
            }
            return sum
        },
        selectDefaultAddress() {
            this.sildeBool? this.$refs.slide.slideUp() : this.$refs.slide.slideDown()
            this.sildeBool = !this.sildeBool
        },
        async getAddressList() {
            let res = await this.$api.getAddress(null, LoginRegister.getLoginInfo().token)
            console.log('addresslist', res);
            if (res.data.error_msg === 'ok')  {
                this.addressList = [...res.data.data.address]
                this.changeDefaultId()
            } else {
                if (res.data.error_code == '4001') {
                    Toast('请用户重新登录!')
                }
                throw new Error('地址数据请求失败!' + res.data.error_msg + res.data.error_code)
                
            }
        },
        changeDefaultId() {
            this.addressList.forEach(item => {
                if (item.is_default) {
                    this.selectAddress = item
                }
            })
        },
        getDefaultAddress(addressInfo) {
            this.addressInfo = addressInfo
            this.isSetDeafult = true
            this.changeDefaultId()
        },
        getShopList() {
            if(this.$cat.has()) {
                if(Array.isArray(this.$cat.getAll())) {
                    this.shopList = this.$cat.getAll()
                    console.log('shoplist', this.shopList);
                } else {
                    throw new Error('本地存储的购物车的数据类型必须是数组!')
                }
            } else {
                // throw new Error('本地存储的购物车为空!')
                Toast.fail('本地存储的购物车为空!')
            }
        },
        buyNow() {
            if (this.isSetDeafult && this.shopList.length > 0) {
                this.payment()
            } else if(this.isSetDeafult && this.shopList.length <= 0) {
                Toast.fail('请将商品添加至购物车!')
            } else if(!this.isSetDeafult && this.shopList.length > 0) {
                Toast.fail('请设置默认地址!')
            } else {
                Toast.fail('请将商品添加至购物车并设置默认地址!')
            }
        },
        async getCoupons() {
            let res = await this.$api.getUserCoupon(LoginRegister.getLoginInfo().token)
            if (res.data.error_msg === 'ok') {
               console.log('coupons', res);
               this.coupons = res.data.data.coupon.map(item => {
                   let limit_total = item.limit_total > 0? '满' + parseInt(item.limit_total) + '元使用' : '无门槛使用'
                   let money = parseInt(item.money)
                   let data = {
                        id: item.id,
                        condition: limit_total,
                        value: money * 100,
                        name:  money + '元优惠卷',
                        startAt: item.get_time + 1000,
                        endAt: item.expires_time + 1000,
                        valueDesc: money,
                        unitDesc: '元'
                   }
                   return data
               })
            } else {
                if (res.data.error_code == '4001') {
                    Toast('请用户重新登录!')
                }
                throw new Error('用户优惠卷数据请求失败!' + res.data.error_msg +  res.data.error_code)
                
            }
        },
        onChange(index) {
            this.selectCoupon = this.coupons[index]
            this.showList = false;
            this.chosenCoupon = index;
            
        },
        onExchange(code) {
            this.coupons.push(coupon);
        }
    }
}
</script>
<style lang="scss" scoped>
#order-submit{
    width: 100%;
    .receive-address{
        display: flex;
        flex-direction: column;
        .text{
            padding: 0 0.2rem;
            box-sizing: border-box;
            height: 1.65rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            span:first-child{
                font-size: 0.3rem;
                color: #26b0fa;
            }
            div.address-info{
                margin-left: 0.35rem;
                display: flex;
                flex-direction: column;
                .user-info{
                    display: flex;
                    flex-direction: row;
                    span{
                        font-size: 0.32rem;
                        color: #2b2b2b;
                    }
                    span:last-child{
                        margin-left: 0.2rem;
                    }
                }
                .receive-address{
                    margin-top: 0.3rem;
                    font-size: 0.28rem;
                    color: #666666;
                }
            }
           
            span:last-child{
                
                flex-grow: 1;
                text-align: right;
                font-size: 0.26rem;
                color: #999999;
            }
        }
        img{
            display: block;
            width: 100%;
        }
    }
    .selected-good{
        margin-top: 0.2rem;
        width: 100%;
        padding: 0 0.2rem;
        box-sizing: border-box;
        
        ul{
            display: flex;
            flex-direction: column;
            
            li{
                margin-top: 0.2rem;
                padding: 0rem 0.2rem;
                box-sizing: border-box;
                display: flex;
                flex-direction: row;
                height: 1.95rem;
                background-color: #fff;
                img{
                    width: 1.8rem;
                    height: 1.8rem;
                    border-radius: 0.05rem;
                    background-color: #bfbfbf;
                }
                div.detail-info{
                    width: calc(100% - 1.8rem);
                    padding-left: 0.15rem;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    .good-name{
                       
                        padding-top: 0.35rem;
                        font-size: 0.28rem;
                        color: #2b2b2b;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    .price-info{
                        padding-top: 0.6rem;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        span:first-child{
                            font-size: 0.24rem;
                            color: #ef8203;
                        }
                        span:last-child{
                            font-size: 0.24rem;
                            color: #999999;
                        }
                    }
                }
            }
        }
    }
    .other-action{
        margin-top: 0.2rem;
        width: 100%;
        padding: 0 0.2rem;
        box-sizing: border-box;
        font-size: 0;
        
        h2{
            padding: 0 0.2rem;
            box-sizing: border-box;
            font-weight: normal;
            height: 0.88rem;
            display: flex;
            flex-direction:row;
            justify-content: space-between;
            align-items: center;
            border: none;
            border-bottom: 1px solid #eeeeee;
            background-color: #fff;
            span:first-child{
                font-size: 0.28rem;
                color: #2b2b2b;
            }
            span:last-child{
                font-size: 0.24rem;
                color: #ef8203;
            }

        }
        h3{
            padding: 0 0.2rem;
            box-sizing: border-box;
            font-weight: normal;
            height: 0.88rem;
            display: flex;
            flex-direction:row;
            justify-content: space-between;
            align-items: center;
            border: none;
            border-bottom: 1px solid #eeeeee;
            background-color: #fff;
            span:first-child{
                font-size: 0.28rem;
                color: #2b2b2b;
            }
            span:last-child{
                font-size: 0.24rem;
                color: #3f3f3f;
            }
        }
    }
    .buy-action{
        display: flex;
        flex-direction: row;
        position: fixed;
        width: 100%;
        height: 0.98rem;
        bottom: 0;
        span:first-child{
            padding-left: 0.3rem;
            width: 65%;
            // text-align: center;
            line-height: 0.98rem;
            font-size: 0.26rem;
            color: #2b2b2b;
            background-color: #fff;
            span{
                padding-left: 0.05rem;
                color: #ef8203;
                background-color: #fff;
            }
        }
        span:last-child{
            width: 35%;
            text-align: center;
            line-height: 0.98rem;
            font-size:0.3rem;
            background-color: #cccccc;
            color: #fff;
        }
        span.active{
            background-color:#ef8203;
            color: #fff;
        }
    }
}
</style>