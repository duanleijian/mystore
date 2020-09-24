<template>
  <div id="address-edit">
    <common-header ref="header"></common-header>
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      show-set-default
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :area-placeholder="areaplaceholder"
      save-button-text="编辑"
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
    created() {
        console.log('AddressAdd界面组件---created');
    },
    mounted() {
        this.$refs.header.isReturn = true
        this.$refs.header.content = '编辑地址'
    },
    data() {
        return {
            areaList,
            searchResult: undefined,
            addressInfo: this.$route.query,
            areaplaceholder: this.$route.query.province + '/' + this.$route.query.city + '/' + this.$route.query.county
        }
    },
    methods: {
        onSave(content) {
            this.updateAddress(content)
            
        },
        async updateAddress(content) {
            let data = {
                name: content.name,
                phone: content.tel,
                province: content.province,
                city: content.city,
                area: content.county,
                address: content.addressDetail,
                zipcode: content.postalCode,
                is_default: Number(content.isDefault),
            }
            let res = await this.$api.updateAddress(data,LoginRegister.getLoginInfo().token, this.$route.query.id)
            if (res.data.error_msg === 'ok') {
                Toast.success('修改成功!')
                this.$router.push('/address')
            } else {
                Toast.fail('修改失败!')
            }
        }
    },
    components: {
        CommonHeader
    }
}
</script>
<style lang="scss" scoped>
/deep/ .van-button {
  background-color: #8fc321;
  border-color: #8fc321;
}
</style>