<template>
    <div id="empty">
        <van-empty
            class="custom-image"
            :image="imgUrl"
            description="你还没有相关订单"/>
    </div>
</template>
<script>
export default {
    name: 'Empty',
    data() {
        return {
            imgUrl: require('../../assets/img/cart-empty.png')
        }
    }
}
</script>
<style scoped>
.van-empty__image{
    width: 0.9rem;
    height: 0.9rem;
    color: #8fc321;
}
</style>