<template>
    <div id="more">
        <div class="category" v-for="(item,index) of navs" :key="index" @click="toGoodCategory(index)">
            <img :src="item.img" alt="无法显示该图片">
            <span>{{ item.name }}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Navigate',
    props: {
        navs: Array
    },
    methods: {
        toGoodCategory(index) {
            this.$router.push({path: '/good-category', query: {index, cat_id: this.navs[index].cat_id}})    
        }
    }
}
</script>
<style scoped>
#more{
    display: flex;
    width: 100%;
    height: 1.9rem;
    flex-direction:  row;
    justify-content: space-around;
    align-items: center;
    font-size: 0;
    overflow-x: auto;
}
#more .category{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
#more img{
    width: 0.9rem;
    height: 0.9rem;
}
#more span{
    margin-top: 0.2rem;
    font-size: 0.24rem;
    color: #1a1a1a;
}
</style>