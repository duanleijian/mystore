<template>
    <div id="collect">
        <common-header ref="header"></common-header>
        <div class="collect-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <ul>
                <li v-for="(item, index) of collectList" :key="index">
                    <div class="good-all-info">
                        <img :src="item.goods_img" alt="无法显示该图片">
                        <div class="good-info">
                            <span class="good-name">{{item.goods_name}}</span>
                            <span class="good-price">￥{{item.goods_price}}</span>
                            <div class="collect-action">
                                <button @click="toGoodDetail(index)">去看看</button>
                                <span @click="cancelCollect(index)">取消收藏</span>
                            </div>
                        </div>
                    </div>
                    
                </li>
            </ul>
        </div>
        
    </div>
    
    
</template>
<script>
import { Toast } from "vant";
import CommonHeader from '../components/common/Header'
import LoginRegister from '../storage/LoginRegister'
export default {
    name: 'Collect',
    components: {
        CommonHeader
    },
    created() {
        this.getUserCollctList()
    },
    mounted() {
        this.$refs.header.isReturn = true
        this.$refs.header.content = this.$route.meta.title
    },
    data() {
        return {
            collectList: [],
            userCollect: {
                page: 1,
                count: 5,
                totalPage: -1
            },
            busy: false,
            isInitLoad: false
        }
    },
    methods: {
        toGoodDetail(index) {
            this.$router.push({path: '/good-detail', query: {goods_id: this.collectList[index].goods_id}})
        },
        cancelCollect(index) {
            async function cancel(currentThis) {
                if (LoginRegister.hasLoginInfo()) {
                    let res = await currentThis.$api.cancelCollect(LoginRegister.getLoginInfo().token, currentThis.$route.query['goods_id'])
                    console.log(res);
                    if (res.data.error_msg === 'ok') {
                        this.collectList.splice(index, 1)
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
        },
        async getUserCollctList() {
            if (LoginRegister.hasLoginInfo()) {
                let res = await this.$api.getUserCollect(LoginRegister.getLoginInfo().token, this.userCollect.page, this.userCollect.count)
                console.log(res);
                if (res.data.error_msg === 'ok') {
                    this.collectList = res.data.data.list
                    if (this.userCollect.page === 1) {
                        this.userCollect.totalPage = Math.ceil(res.data.data.total / this.userCollect.count)
                    }
                } else {
                    if (res.data.error_code === 4001) {
                        Toast.fail('token已过期或失效!')
                        this.$router.push('/login')
                    } else {
                        // Toast.success('收藏设置失败!')
                        throw new Error('收藏数据获取失败!', res.data.error_msg)
                    }
                    
                }
            }
        },
        loadMore() {
            if (!this.isInitLoad) {
                this.isInitLoad = true
            } else {
                if (this.userCollect.page + 1 <= this.userCollect.totalPage) {
                    this.userCollect.page += 1 
                    this.getUserCollctList()
                } else {
                    Toast('没有更多数据了!')
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#collect{
    width: 100%;
    height: 100%;
    font-size: 0;
    .collect-list{
        ul{
            padding: 0 0.2rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            li{
                padding: 0 0.2rem;
                box-sizing: border-box;
                margin-top: 0.2rem;
                box-sizing: border-box;
                background-color: #fff;
                .good-all-info{
                    padding: 0.2rem 0rem;
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    img{
                        width: 1.8rem;
                        height: 1.8rem;
                        border-radius: 0.05rem;
                    }
                    .good-info{
                        padding-left: 0.2rem;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .good-name{
                            padding-top: 0.25rem;
                            font-weight: 600;
                            width: 4rem;
                            font-size: 0.28rem;
                            color: #2d2d2d;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .good-price{
                            width: 100%;
                            font-size: 0.32rem;
                            color: #ef8203;
                        }
                        .collect-action{
                            position: absolute;
                            bottom: 0.35rem;
                            right: 0.2rem;
                            display: flex;
                            flex-direction: column;
                            align-content: center;
                            button{
                                width: 1.5rem;
                                height: 0.4rem;
                                font-size: 0.26rem;
                                color: #fff;
                                background-color: #8fc321;
                            }
                            span{
                                padding-top: 0.15rem;
                                text-align: center;
                                font-size: 0.28rem;
                                color: #2d2d2d;
                            }
                        }
                    }
                }
                
            }
        }
    }
}
</style>