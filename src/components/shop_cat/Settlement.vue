<template>
    <div id="settlement" v-show="!payInfo.empty">
        <div class="all-icon" >
            <span class="iconfont icon-xuanzhongyuandian" v-show="!payInfo.allSelected"></span>
            <span class="iconfont icon-xuanzhong" v-show="payInfo.allSelected"></span>
        </div>
        <span class="all-font">全选</span>
        <span class="total-price">应付:<span>￥{{payInfo.totalPrice}}</span></span>
        <button @click="$router.push('/order-submit')">去支付</button>
    </div>
</template>
<script>
export default {
    name: 'Settlement',
    props: {
        payInfo: Object
    },
    created() {
    },
    data() {
        return {
            isShow: true
        }
    },
    methods: {
        
    }
}
</script>
<style lang="scss" scoped>
#settlement{
    padding-left: 0.2rem;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0.9rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 0;
    width: 100%;
    height: 0.88rem;
    background-color: #fff;
    div.all-icon{
        display: flex;
        flex-direction: row;
        width: 0.3rem;
        height: 0.3rem;
        span{
            font-size: 0.3rem;
            color: #2b2b2b; 
        }
        span.icon-xuanzhong{
            color: #8fc321;
        }
    }
    span.all-font{
        margin-left: 0.1rem;
        font-size: 0.3rem;
        color: #2b2b2b;
    }
    span.total-price{
        padding-right: 0.2rem;
        font-size: 0.35rem;
        color: #2b2b2b;
        padding-left: 0.2rem;
        box-sizing: border-box;
        flex-grow: 1;
        text-align: right;
        span{
             font-size: 0.34rem;
            color:#ef8203;
        }
        
       
    }
    button{
        font-size: 0.26rem;
        width: 1.4rem;
        height: 100%;
        background-color: #8fc321;
        color: #fff;
    }
    
}

</style>