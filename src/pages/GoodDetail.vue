<template>
    <div id="good-detail">
        <common-header ref="header"></common-header>
        <div class="picture" v-if="imgs.length > 0">
            <swiper ref="mySwiper" :options="swiperOptions">
                <swiper-slide v-for="(item,index) of imgs" :key="index">
                    <img :src="item" alt="无法显示该图片">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <div class="good-info" v-if="goodInfo.goodName && goodInfo.goodPrice">
            <h2>{{goodInfo.goodName}}</h2>
            <div class="good-collect">
                <h4>普通价:<span>￥{{goodInfo.goodPrice}}</span></h4>
                <span class="iconfont icon-shoucang" v-show="!isCollect" @click="confirmCollect"></span>
                <span class="iconfont icon-shoucang1" v-show="isCollect" @click="cancelCollect"></span>
            </div>
            
        </div>
        <div class="good-nums" v-if="isCollect !== -1">
            <span>选择数量</span>
            <van-stepper v-model="goodInfo.count" step="1" class="stepper" integer input-width="0.44rem" button-size="0.36rem"/>
        </div>
        <div class="good-img-detail" v-if="imgDetail.length > 0">
            <h2>商品详情</h2>
            <img :src="item" alt="无法显示该图片" v-for="item of imgDetail" :key="item">
        </div>
        <div class="good-btn" v-if="imgDetail.length > 0">
            <button @click="addCat()">加入购物车</button>
            <button>立即购买</button>
        </div>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import CommonHeader from '../components/common/Header'
import LoginRegister from '../storage/LoginRegister'
import { Toast, Dialog } from 'vant'
export default {
    name: 'GoodDetail',
    created() {
        this.getGoodDetail()
        this.checkCollect()
    },
    mounted() {
        this.$refs.header.isReturn = true
        this.$refs.header.content = '商品详情'
    },
    data() {
        return {
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination'
                }
            },
            imgs: [],
            imgDetail: [],
            goodInfo: {
                goodName: '',
                goodPrice: 0,
                count: 0
            },
            isCollect: -1,
            goodDetail: null
        }
    },
    methods: {
        addCat(index) {
            if (!this.$cat.has()) {
                this.$cat.factory('array')
                this.$cat.set(-1,{
                    id: this.goodDetail.goods_id,
                    img: this.goodDetail.goods_img,
                    name: this.goodDetail.goods_name,
                    price: this.goodDetail.goods_price,
                    sale_num: this.goodDetail.sale_num,
                    selected: true,
                    count: 1
                })
                this.$toast.success('添加成功')
            } else {
                if (this.repeatArray(this.$cat.getAll(), this.goodDetail.goods_id)) {
                    this.$cat.set(-1,{
                        id: this.goodDetail.goods_id,
                        img: this.goodDetail.goods_img,
                        name: this.goodDetail.goods_name,
                        price: this.goodDetail.goods_price,
                        sale_num: this.goodDetail.sale_num,
                        selected: true,
                        count: 1
                    })
                    this.$toast.success('添加成功')
                } else {
                    this.$toast.fail('重复添加!')
                } 
            }
        },
        repeatArray(array, id) {
            let repeatObj = {}, result = true
            for(let i = 0, len = array.length; i < len; i++) {
                if (array[i].id == id) {
                    result = false
                } 
            }
            return result
        },
        async getGoodDetail() {
            try{
                let res = await this.$api.getGoodDetail(this.$route.query['goods_id'])
                console.log(res);
                this.goodDetail = res.data.data.goods
                this.goodInfo.goodName = res.data.data.goods.goods_name
                this.goodInfo.goodPrice = res.data.data.goods.goods_price
                this.imgs = [...res.data.data.gallery]
                this.imgDetail = [...res.data.data.goods.content]
                console.log('content', res.data.data.goods.content)
            } catch(err){
                throw new Error(err)
            } finally{

            }
        },
        async checkCollect() {
            if (LoginRegister.hasLoginInfo()) {
                let res = await this.$api.checkCollect(LoginRegister.getLoginInfo().token, this.$route.query['goods_id'])
                if (res.data.error_msg === 'ok') {
                   this.isCollect = res.data.data.collect
                } else {
                    if (res.data.error_code === 4001) {
                        Toast.fail('token已过期或失效!')
                        this.$router.push('/login')
                    }
                    throw new Error('检测收藏状态失败!', res.data.error_msg)
                }
            }
            
        },
        async confirmCollect() {
            if (LoginRegister.hasLoginInfo()) {
                let res = await this.$api.confirmCollect(LoginRegister.getLoginInfo().token, this.$route.query['goods_id'])
                console.log(res);
                if (res.data.error_msg === 'ok') {
                    this.isCollect = true
                    Toast.success('收藏成功!')
                } else {
                    if (res.data.error_code === 4001) {
                        Toast.fail('token已过期或失效!')
                        this.$router.push('/login')
                    } else {
                        Toast.success('收藏失败!')
                        throw new Error('收藏失败!', res.data.error_msg)
                    }
                    
                }
            }
        },
        async cancelCollect() {
            async function cancel(currentThis) {
                if (LoginRegister.hasLoginInfo()) {
                    let res = await currentThis.$api.cancelCollect(LoginRegister.getLoginInfo().token, currentThis.$route.query['goods_id'])
                    console.log(res);
                    if (res.data.error_msg === 'ok') {
                        currentThis.isCollect = false
                        Toast.success('收藏取消成功!')
                    } else {
                        if (res.data.error_code === 4001) {
                            Toast.fail('token已过期或失效!')
                            currentThis.$router.push('/login')
                        } else {
                            Toast.success('收藏取消失败!')
                            throw new Error('取消收藏失败!', res.data.error_msg)
                        }
                    }
                }
            }
            const Dialog = this.$dialog.confirm({ message: '你确定取消收藏' }), that = this
            Dialog.then(res => {
                cancel(that)
            })
        }
    },
    components: {
        swiper,
        swiperSlide,
        CommonHeader
    }
}
</script>
<style lang="scss" scoped>
#good-detail{
    background-color: #f5f5f5;
}
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

.picture{
  width: 100%;
  box-sizing: border-box;
  img{
  display: block;
  width: 100%;
  border-radius: 0.1rem;
  }
}
.good-info{
    position: relative;
    padding: 0.2rem 0.2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    h2{
        font-weight: normal;
        font-size: 0.28rem;
        color: #2b2b2b;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap; 
    }
    .good-collect{
        display: flex;
        flex-direction: row;
        h4{
            padding-top: 0.25rem;
            font-weight: normal;
            font-size: 0.28rem;
            color: #2b2b2b;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;    
            span{
                color: #ef8203;
            }
        }
        span{
            padding-top: 0.25rem;
            flex-grow: 1;
            text-align: right;
            font-size: 0.3rem;
            color: #ef8203;
        }
    }
}
.good-nums{
    padding: 0.27rem 0.2rem;
    margin-top: 0.2rem;
    line-height: 0.36rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #fff;
    span{
        font-size: 0.28rem;
        color: #2b2b2b;
    }
}
.good-img-detail{
    width: 100%;
    h2{
        padding: 0.27rem;
        position: relative;
        text-align: center;
        font-weight: normal;
        font-size: 0.28rem;
        color: #2b2b2b;
        &::before, &::after{
            content: '';
            position: absolute;
            top:50%;
            width: 0.6rem;
            height: 1px;
            background-color: #2b2b2b;
        }
        &::before{
            left: 2.5rem;
        }
        &::after{
            right: 2.5rem;
        }
    }
    img{
        display: block;
        width: 100%;
    }
}
.good-btn{
    position: fixed;
    bottom: 0.2rem;
    width: 100%;
    height: 0.98rem;
    button{
        font-size: 0.3rem;
        width: 50%;
        height: 100%;
        color: #fff;
    }
    button:first-child{
        background-color: #ef8203;
    }
    button:last-child{
        background-color: #8fc321;
    }
}

</style>