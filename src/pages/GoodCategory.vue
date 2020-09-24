<template>
    <div id="good">
        <common-header ref="header"></common-header>
        <div class="container">
            <category-aside @sendId="getGoodInfo" :pager="pager"></category-aside>
            <goods :goodList="goodList" :catId="catId" :pager="pager" @sendGoodInfo="getGoodInfo2"></goods>
        </div>
        <nav-bar ref="nav"></nav-bar>
    </div>
</template>
<script>
import CommonHeader from '../components/common/Header'
import CategoryAside from '../components/good_category/CategoryAside'
import Goods from '../components/good_category/Goods'
import NavBar from '../components/common/NavBar'
export default {
    name: 'GoodCategory',
    created() {
    },
    mounted() {
        this.$refs.header.isReturn = true
        this.$refs.header.content = this.$route.meta.title
        this.$refs.nav.nowIndex = 1
        
    },
    data() {
        return {
            catId: 0,
            goodList: [],
            pager: {
                cat_id: 0,
                page: 1,
                count: 10,
                totalPage: -1
            }
        }
    },
    methods: {
        getGoodInfo(goodParam) {
            console.log('拿到数据1',goodParam);
            this.goodList = [...goodParam.goodList]
            this.catId = goodParam.catId
            this.pager = goodParam.pager
        },
        getGoodInfo2(goodParam) {
            console.log('拿到数据2',goodParam);
            this.goodList = [...goodParam.goodList]
            this.catId = goodParam.catId
            this.pager = goodParam.pager
        }
    },
    components: {
        CommonHeader,
        CategoryAside,
        Goods,
        NavBar
    }
}
</script>
<style scoped>
#good{
    height: 100%;
}
.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}
</style>