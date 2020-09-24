<template>
    <div id="search" >
        <div class="ic">
            <span class="iconfont icon-fangdajing"></span>
            <span>搜索商品</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Search',
    methods: {
       
    }
}
</script>
<style scoped>
#search{
    position: relative;
    padding: 0.1rem 0.4rem;
    box-sizing: border-box;
    width: 100%;
    height: 0.8rem;
    font-size: 0;
}
#search .ic{
    width: 100%;
    height: 100%;
    color: #999999;
    font-size: 0rem;
    text-align: left;
    line-height: 0.6rem;
    border-radius: 1rem;
    background-color: #fff;
}
#search .ic span:first-child{
    margin-left: 0.3rem;
    font-size: 0.3rem;
}
#search .ic span:last-child{
    margin-left: 0.2rem;
    font-size: 0.26rem;
}
</style>