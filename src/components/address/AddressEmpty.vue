<template>
    <div id="address-empty">
        <div class="address-icon">
            <span class="iconfont icon-dizhi"></span>
            <span class="iconfont icon-dizhi1"></span>
        </div> 
        <span class="toast-font">您暂时还没有创建收件地址喔~</span>
        <div class="address-increment">
            <button @click="toAdd('/address-add')">添加地址</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AddressEmpty',
    methods: {
        toAdd(target) {
            this.$router.push(target)
        }
    }
}
</script>
<style lang="scss" scoped>
#address-empty{
    
    width: 100%;
    height: calc(100% - 0.88rem);
    background-color: #f5f5f5;
    margin-top: 2.4rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0;
    .address-icon{
        width: 3.55rem;
        position: relative;
        display: flex;
        flex-direction: column;
        padding-bottom: 0.2rem;
        span.icon-dizhi{
        font-size: 2.5rem;
        color: #999999;
        }
        span.icon-dizhi1{
            position: absolute;
            width: 1.08rem;
            height: 1.08rem;
            bottom: 0.1rem;
            right: 0.1rem;
            font-size: 0.52rem;
            text-align: center;
            line-height: 1.08rem;
            color: #fff;
            background-color: #8fc321;
            border-radius: 50%;
        }
    }
    span.toast-font{
        font-size: 0.26rem;
        color: #2b2b2b;
    }
    .address-increment{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        button{
            width: 100%;
            height: 0.98rem;
            font-size: 0.3rem;
            color: #ffffff;
            background-color: #8fc321;
        }
    }
}
</style>