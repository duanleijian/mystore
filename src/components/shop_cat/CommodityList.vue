<template>
    <div id="commodity-list">
        <van-swipe-cell v-for="(item, index) of cells" :key="index"  >
            <div class="shop-item">
                <div class="is-select" @click="toggleSelect(index)">
                    <span class="iconfont icon-xuanzhongyuandian" v-show="!seleteds[index]"></span>
                    <span class="iconfont icon-xuanzhong" v-show="seleteds[index]"></span>
                </div>
                <div class="item-info">
                    <img :src="item.img" alt="无法显示该图片">
                    <div class="info-right">
                        <h2>{{ item.name }}</h2>
                        <h3>已售出{{item.sale_num}}</h3>
                        <h4>￥{{item.price}}</h4>
                    </div>
                    <van-stepper v-model="item.count" step="1" class="stepper" integer input-width="0.4rem" button-size="0.32rem" @change="recalcTotalPrice(index)"/>
                </div>
            </div>
            <template #right>
                <van-button square type="danger" text="删除" @click.prevent="deleteItem(index)"/>
            </template>
        </van-swipe-cell>
    </div>
   
</template>
<script>
export default {
    name: 'CommodityList',
    props: {
        selects: Array
    },
    created() {
        this.addPropertyForSelects()
        this.setPayInfo()
    },
    data() {
        return {
            cells: [],
            seleteds: []
        }
    },
    methods: {
        addPropertyForSelects () {
            this.seleteds = new Array(this.selects.length)
            this.cells = this.selects
            this.selects.forEach((item, index) => {
                this.seleteds[index] = this.cells[index].selected
            })
        },
        deleteItem(index) {
            const Dialog = this.$dialog.confirm({ message: '你确定删除此订单' })
            Dialog.then(res => {
                this.cells.splice(index ,1)
                this.seleteds.splice(index ,1)
                this.$cat.removeArr(index)
                this.setPayInfo()
            })
        },
        toggleSelect(index) {
            this.seleteds.splice(index, 1, !this.seleteds[index])
            this.cells[index].selected = !this.cells[index].selected
            this.$cat.set(index, this.cells[index])
            this.setPayInfo()
        },
        setPayInfo() {
            let totalPrice = 0, allSelected = true ,empty = true
            this.seleteds.forEach((item, index) => {
                if (item) {
                   totalPrice +=  Number(this.cells[index].price * this.cells[index].count)
                } else {
                    allSelected = false
                }
            })
            empty = this.isEmpty()
            this.$emit('getTotalPrice', {totalPrice, allSelected, empty})
        },
        recalcTotalPrice(index) {
            this.$cat.set(index, this.cells[index])
            this.setPayInfo()
        },
        isEmpty() {
            let empty = this.seleteds.every(item => {
                return item === false
            })
            return empty
        }
    }
}
</script>
<style lang="scss" scoped>
$color1:#8fc321; 
#commodity-list{
    padding-bottom: 0.9rem;
}
/deep/ .van-stepper__plus{
    background-color: #8fc321;
    color: #fff;
}
/deep/ .van-stepper__minus{
    background-color: #8fc321;
    color: #fff;
} 
/deep/.van-stepper__minus--disabled{
    background-color: #e8e8e8;
}
/deep/ .van-swipe-cell{
    padding: 0.2rem;
    padding-right: 0rem;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
/deep/ .van-swipe-cell__right{
    box-sizing: border-box;
}
/deep/ .van-button{
    padding: 0 0.30.5rem;
    font-size: 0.2rem;
    height: 100%;
}
.stepper{
    position: absolute;
    bottom: 0.1rem;
    right: 0.1rem;
}
.shop-item{
    padding-left: 0.2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #fff;
    .is-select{
        width: 0.3rem;
        height: 0.3rem;
        font-size: 0;
        span{
            font-size: 0.3rem;
           
        }
        span.icon-xuanzhong{
                color: $color1;
        } 
    }
    .item-info{
        padding-left: 0.2rem;
        box-sizing: border-box;
        width: calc(100% - 0.3rem);
        display: flex;
        flex-direction: row;
        font-size: 0;
        img{
            display: block;
            width: 1.8rem;
            height: 1.8rem;
            border-radius: 0.1rem;
        }
        .info-right{
            width: calc(100% - 1.8rem);
            display: flex;
            flex-direction: column;
            h2{
                padding-top: 0.25rem;
                font-size: 0.28rem;
                font-weight: normal;
                color: #2d2d2d;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            h3{
                padding-top: 0.2rem;
                font-size: 0.24rem;
                font-weight: normal;
                color: #2d2d2d;
                
            }
            h4{
                padding-top: 0.5rem;
                font-size: 0.24rem;
                font-weight: normal;
                color: #ef8203;
            }
        }
    }
}

</style>