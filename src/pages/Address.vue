<template>
    <div id="address">
        <common-header ref="header"></common-header>
        <address-empty v-if="addressList.length == 0"></address-empty>
        <address-list  v-if="addressList.length > 0" :addressList="addressList"></address-list>
    </div> 
</template>
<script>
import LoginRegister from '../storage/LoginRegister'
import CommonHeader from '../components/common/Header'
import AddressEmpty from '../components/address/AddressEmpty'
import AddressList from '../components/address/AddressList'
export default {
    name:  'Address',
    created() {
        this.getAddressList()
    },
    mounted() {
        this.$refs.header.isReturn = true
        this.$refs.header.content = '收货地址'
    },
    data() {
        return {
            addressList: []
        }
    },
    components: {
        CommonHeader,
        AddressEmpty,
        AddressList
    },
    methods: {
        async getAddressList() {
            let res = await this.$api.getAddress(null, LoginRegister.getLoginInfo().token)
            console.log('addresslist', res);
            if (res.data.error_msg === 'ok')  {
                this.addressList = [...res.data.data.address]
                console.log('address', this.addressList);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#address{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    overflow: hidden;
}
</style>