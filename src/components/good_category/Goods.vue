<template>
    <div id="good-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" >
        <ul>
            <li class="good-info" v-for="(item, index) in goodList" :key="index" @click="redirectGoodDetail()">
                <img :src="item.img" alt="无法显示该图片" >
                <div class="text-info">
                    <h2>{{item.name}}</h2>
                    <h3>已售出{{item.sale_num}}</h3>
                    <h4>￥{{item.price}}</h4>
                </div>
                <div class="add-cat" @click="addCat(index)">
                    <span class="iconfont icon-gouwuche1"></span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Goods',
    created() {
    },
    mounted() {
    },
    props: {
        goodList: Array,
        catId: Number,
        pager: Object
    },
    data() {
        return {
            busy: false,
            isInitLoad: false
        }
    },
    methods: {
        async loadMore() {
            if (!this.isInitLoad) {
                this.isInitLoad = true
            } else {
                if (this.pager.page + 1 <= this.pager.totalPage) {
                    this.pager.page += 1
                    let result = await this.$api.getGoodList({
                        cat_id: this.pager.cat_id,
                        page: this.pager.page,
                        count: this.pager.count
                    })
                    console.log('goodlist2', result);
                    if (result.data.error_msg === 'ok') {
                        result.data.data.goods.forEach(element => {
                            this.goodList.push(element)
                        });
                        this.$emit('sendGoodInfo', {goodList: this.goodList, catId: this.catId, pager: this.pager})
                    } else {
                        throw new Error('加载更多商品数据失败!', res.data.error_code + res.data.error_msg)
                    }
                }
                
            }
            
           
        },
        addCat(index) {
            if (!this.$cat.has()) {
                this.$cat.factory('array')
                this.$cat.set(-1, this.goods[index])
            } else {
                this.$cat.set(-1, this.goods[index])
            }
        },
        redirectGoodDetail(index) {
            
            this.$router.push({path: '/good-detail', query: {goods_id: this.goodList[index].goods_id}})
            this.setHistory(index)
        },
        async setHistory(index) {
            if (LoginRegister.hasLoginInfo()) {
                const token = LoginRegister.getLoginInfo().token
                let res = await this.$api.setHistory(token, this.goodList[index].goods_id)
                console.log(res);
                if (res.data.error_msg === 'ok') {
                    console.log('商品留痕成功!');
                } else {
                    throw Error('商品留痕失败!', res.data.error_msg + res.data.error_code)
                }
            } else {
                Toast.fail('token过期或失效!')
                this.$router.push('/login')
            }
        
        }
    }
}
</script>
<style scoped>
#good-list{
    width: 75%;
    height: 100%;
    overflow: auto;
}
#good-list ul{
    height: 100%;
    display: flex;
    flex-direction: column;
    
}
#good-list ul li{
    position: relative;
    margin-top: 0.3rem;
    display: flex;
    flex-direction: row;
}
#good-list ul li img{
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 0.1rem;
}

#good-list ul li .text-info{
    padding-left: 0.3rem;
    padding-right: 0.2rem;
    box-sizing: border-box;
    width: calc(100% - 1.8rem);
    display: flex;
    flex-direction: column;
}
#good-list ul li .text-info h2{
    padding-top: 0.25rem;
    font-size: 0.28rem;
    font-weight: normal;
    color: #2d2d2d;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
#good-list ul li .text-info h3{
    padding-top: 0.2rem;
    font-size: 0.24rem;
     font-weight: normal;
    color: #2d2d2d;
    
}
#good-list ul li .text-info h4{
    padding-top: 0.5rem;
    font-size: 0.24rem;
    font-weight: normal;
    color: #ef8203;
}
#good-list ul li .add-cat{
    position: absolute;
    right: 0.2rem;
    bottom: 0.45rem;
    width: 0.5rem;
    height: 0.5rem;
}
#good-list ul li .add-cat span{
    font-size: 0.5rem;
    color: #8fc321;
}
</style>