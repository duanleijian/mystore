<template>
    <div id="header">
        <span class="iconfont icon-zuojiantou" v-if="isReturn" @click="goBack"></span>
        <slot><span>{{ content }}</span></slot>
    </div>
</template>
<script>
export default {
    name: 'CommonHeader',
    data() {
        return {
            isReturn: true,
            content: '生鲜超市'
        }
    },
    methods: {
        goBack() {
            this.$router.back()
        }
    }
}
</script>
<style scoped>
#header{
    position: relative;
    width:100%;
    height: 0.88rem;
    font-size: 0;
    text-align:center;
    line-height: 0.88rem;
    background-color: #fff;
}
#header span.iconfont{
    position: absolute;
    left: 0rem;  
    font-size: 0.6rem;
    color: #414040;
}
#header span:not(.iconfont){
    font-size: 0.32rem;
    color: #414040;
}
</style>