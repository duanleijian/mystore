<template>
    <div id="good-list">
        <h2>推荐商品</h2>
        <div class="good-info">
            <ul>
                <li v-for="(item, index) of goods" :key="index" @click="redirectGoodDetail(index)">
                    <img :src="item.img" alt="">
                    <div class="good-showinfo">
                        <h3>{{item.name}}</h3>
                        <h4>已售出{{item.sale_num}}</h4>
                        <span>￥{{item.price}}</span>
                    </div>
                    <div class="add-cat" @click.stop="addCat(index)">
                        <span class="iconfont icon-gouwuche1"></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import LoginRegister  from '../../storage/LoginRegister'
export default {
    name: 'Good',
    props: {
        goods: Array
    },
    methods: {
        addCat(index) {
            if (!this.$cat.has()) {
                this.$cat.factory('array')
                this.$cat.set(-1, Object.assign(this.goods[index], {selected: true, count: 1}))
                this.$toast.success('添加成功')
            } else {
                if (this.repeatArray(this.$cat.getAll(), this.goods[index].id)) {
                    this.$cat.set(-1, Object.assign(this.goods[index], {selected: true, count: 1}))
                    this.$toast.success('添加成功')
                } else {
                    this.$toast.fail('重复添加!')
                } 
            }
        },
        repeatArray(array, id) {
            let repeatObj = {}, result = true
            for(let i = 0, len = array.length; i < len; i++) {
                if (array[i].id == id) {
                    result = false
                } 
            }
            return result
        },
        redirectGoodDetail(index) {
            console.log('跳转到商品详情', this.goods[index]);
            this.setHistory(index)
            this.$router.push({path: '/good-detail', query: {goods_id: this.goods[index].id}})
            
        },
        async setHistory(index) {
    
            if (LoginRegister.hasLoginInfo()) {
                const token = LoginRegister.getLoginInfo().token
                let res = await this.$api.setHistory(token, this.goods[index].id)
                console.log(res);
                if (res.data.error_msg === 'ok') {

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
    width: 100%;
    padding: 0 0.2rem;
    padding-bottom: 1.15rem;
    box-sizing: border-box;
}
#good-list .good-info{
    height: 10.5rem;
     overflow: auto;
}
#good-list .good-info .good-showinfo{
    padding: 0 0.2rem;
    box-sizing: border-box;
    text-align: left;
}
#good-list .good-info ul{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}
#good-list .good-info ul li{
    position: relative;
    margin-top: 0.2rem;
    padding-bottom: 0.2rem;
    width: 48.5%;
    font-size: 0;
    background-color: #fff;
}
#good-list .good-info ul li .add-cat{
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
    width: 0.5rem;
    height: 0.5rem;
}
#good-list .good-info ul li .add-cat span{
    font-size: 0.5rem;
    color: #8fc321;
}
#good-list img{
    width: 100%;
}
#good-list h2{
    text-align: center;
    margin-bottom: 0.1rem;
    position: relative;
    font-size: 0.28rem;
    color:#8fc321;
    font-weight: normal;
}
#good-list h2::before, 
#good-list h2::after{
    content: '';
    position: absolute;
    top:50%;
    width: 0.4rem;
    height: 1px;
    background-color: #8fc321;
}
#good-list h2::before{
    left: 2.5rem;
}
#good-list h2::after{
    right: 2.5rem;
}
#good-list h3{
    padding-top:0.2rem;
    font-size: 0.28rem;
    font-weight: normal;
    color: #1a1a1a;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
#good-list h4{
    padding-top:0.15rem;
    padding-bottom:0.22rem;
    font-size: 0.24rem;
    font-weight: normal;
    color: #909090;
}
#good-list span{
    font-size: 0.24rem;
    color: #ef8203;
}
</style>