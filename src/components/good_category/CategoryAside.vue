<template>
    <div id="aside">
        <ul>
            <li class="aside-item" :class="{'aside-active':activeSelect(index)}" v-for="(item, index) of goodsCategory" :key="index" @click="select(index,item.cat_id)">
                <span>{{ item.cat_name }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'CategoryAside',
    created() {
       this.getGoodCategory()     
    },
    props: {
        pager: Object
    },
    data() {
        return {
            nowIndex: 0,
            goodsCategory: [],
            goodsList: [],
            
        }
    },
    methods: {
        activeSelect(index) {
            return this.nowIndex === index
        },
        async getGoodCategory() {
            let result = await this.$api.getGoodCategory()
            console.log('goodcatory', result);
            if (result.data.error_msg === 'ok'){
                this.goodsCategory  = result.data.data
                this.goodsCategory.unshift({
                    cat_id: 0,
                    cat_name: '全部',
                    img: '',
                    parent_id: 0
                })
                this.goodsCategory.push({
                    cat_id: 10000,
                    cat_name: '其他',
                    img: '',
                    parent_id: 0
                })
            } else {
                throw new Error('商品分类数据获取失败!', result.data.error_code + result.data.error_msg)
            }
            if (this.$route.query.cat_id) {
                this.select(parseInt(this.$route.query.index) + 1, parseInt(this.$route.query.cat_id))
            } else {
                this.select(0, this.goodsCategory[0].cat_id)
            }
            
        },
        async select(index, catId) {
            this.nowIndex = index
            this.pager.cat_id = catId
            let result = await this.$api.getGoodList({
                    cat_id: this.pager.cat_id,
                    page: this.pager.page,
                    count: this.pager.count
            })
            console.log('goodlist',result);
            if (result.data.error_msg === 'ok') {
                if(result.data.error_code === 0) {
                    this.goodsList = [...result.data.data.goods]
                    if (this.pager.page === 1) {
                        this.pager.totalPage = Math.ceil(result.data.data.total / this.pager.count)
                    }
                    console.log('pager', this.pager);
                    this.$emit('sendId', {goodList:this.goodsList, catId: catId, pager: this.pager})
                }
                
            }
            
        }
        
    }
}
</script>
<style scoped>
#aside{
    width:25%;
}
#aside ul{
    display: flex;
    flex-direction: column;
}
#aside ul li{
    position: relative;
    width: 100%;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.28rem;
    color: #2d2d2d;
    
}
.aside-active{
    background-color: #fff;
}
.aside-active::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0.08rem;
    height: 1rem;
    background-color: #8fc321;
}
</style>