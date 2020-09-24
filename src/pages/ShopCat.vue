<template>
    <div id="shop-cat">
        <common-header ref="header"></common-header>
        <commodity-list v-if="returnEmpty" :selects="selectedList" @getTotalPrice="caclTotalPrice"></commodity-list>
        <empty v-if="!returnEmpty"></empty>
        <settlement :payInfo="payInfo" v-if="returnEmpty"></settlement>
        <nav-bar ref="nav"></nav-bar>
    </div>
</template>
<script>
import Vue from 'vue'
import CommonHeader from '../components/common/Header'
import NavBar from '../components/common/NavBar'
import Empty from '../components/shop_cat/Empty'
import CommodityList from '../components/shop_cat/CommodityList'
import Settlement from '../components/shop_cat/Settlement'
export default {
    created() {
        this.getShopList()
    },
    mounted() {
        this.$refs.header.isReturn = true
        this.$refs.header.content = '购物车'
        this.$refs.nav.nowIndex = 1
       
    },
    data() {
        return {
            selectedList: [],
            payInfo: {
                allSelected: true,
                totalPrice: 0,
                empty: true
            }
            
        }
    },
    computed: {
        returnEmpty() {
            return this.selectedList.length > 0
        }
    },
    components: {
        CommonHeader,
        NavBar,
        Empty,
        CommodityList,
        Settlement
    },
    methods: {
        caclTotalPrice(payInfo) {
            this.payInfo.totalPrice = payInfo.totalPrice
            this.payInfo.allSelected = payInfo.allSelected
            this.payInfo.empty = payInfo.empty
        },
        getShopList() {
            if(!this.$cat.has()) {
                this.$cat.factory('array')
            }
            let shopping = this.$cat.getAll()
            if (Array.isArray(shopping)) {
                if (shopping.length > 0) {
                    let cdn1 = Reflect.has(shopping[0], 'selected')
                    let cdn2 = Reflect.has(shopping[0], 'count')
                    shopping = shopping.map(item => {
                        if(!cdn1) item.selected = true
                        if(!cdn2) item.count = 1
                        return item
                    })
                }
                this.$cat.setAll(shopping)
            } else {
                throw new Error('购物清单必须是一个数组类型!')
            }
            this.selectedList = [...shopping]
        }
    }
}
</script>
<style scoped>

</style>