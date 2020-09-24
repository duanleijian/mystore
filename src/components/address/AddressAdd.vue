<template>
    <div id="address-add">
        <common-header ref="header"></common-header>
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-set-default
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            save-button-text="添加"
            @save="onSave"
        />
    </div>
    
</template>
<script>
import areaList from '../../data/addressData'
import LoginRegister from '../../storage/LoginRegister'
import CommonHeader from '../common/Header'
import { Toast } from 'vant'
export default {
    name:'AddressAdd',
    mounted() {
        this.$refs.header.isReturn = true
        this.$refs.header.content = '添加地址'
    },
    data() {
        return {
            areaList,
            searchResult: undefined,
            edit: {
                province: '',
                city: '',
                area: '',
                name: '',
                address: '',
                phone: '',
                zipcode: '',
                is_default: ''
            }
        }
    },
    methods: {
        onSave(content) {
            console.log('content1', content);
            this.getAddress(content)
        },
        async getAddress(content) {
            let res = await this.$api.addAddress({
                name: content.name,
                phone: content.tel,
                province: content.province,
                city: content.city,
                area: content.county,
                address: content.addressDetail,
                zipcode: content.postalCode,
                is_default: content.isDefault? 1 : 0,
            },LoginRegister.getLoginInfo().token)
            console.log('res', res);
            if (res.data.error_msg === 'ok') {
                Toast.success('添加成功!')
                this.$router.push('/address')
            } else {
                Toast.fail('添加失败!')
            }
        }
    },
    components: {
        CommonHeader,
        Toast
    }
}
</script>
<style lang="scss" scoped>
/deep/ .van-button{
    background-color: #8fc321;
    border-color: #8fc321;
}
</style>