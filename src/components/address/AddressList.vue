<template>
    <div id="address-list">
        <ul>
            <li class="address-item" v-for="(item, index) of addressList" :key="item.id">
                <div class="user-info">
                    <span>{{item.name}}</span>
                    <span>{{item.phone}}</span>
                </div>
                <div class="user-address">
                    <span>[默认]</span>
                    <span>{{concatAddress(index)}}</span>
                </div>
                <div class="user-action">
                    <div class="is-default" @click="toggleDefault(index)">
                        <span class="iconfont icon-check-boxoutline" v-show="!item.is_default"></span>
                        <span class="iconfont icon-duoxuankuang-shi" v-show="item.is_default"></span>
                        <span class="default">设为默认地址</span>
                    </div>
                    <div class="action-detail">
                        <span class="iconfont icon-bianji" @click="showAddress(index)">编辑</span>
                        <span class="iconfont icon-shanchu" @click="deleteAddress(index)">删除</span>
                    </div>
                    
                </div>
            </li>
        </ul>
        <button class="btn-add_address" @click="toAdd('/address-add')">添加新地址</button>
    </div>
</template>
<script>
import LoginRegister from '../../storage/LoginRegister'
import { Toast, Dialog } from 'vant'
export default {
    name: 'AddressList',
    props: {
        addressList: Array
    },
    computed: {
        getName() {
            return LoginRegister.getLoginInfo().name
        }
       
    },
    methods: {
        concatAddress(index) {
            let item = this.addressList[index]
            return item.province + item.city + item.area + item.address
        },
        toggleDefault(index) {
            if (this.addressList[index].is_default) {
                // this.addressList[index].is_default = false
                Toast.fail('默认地址必须存在!')
            } else {
                this.addressList.forEach(item => {
                    item.is_default = false
                })
                this.addressList[index].is_default = true
                this.setDeafult(index)
                
                
            } 
        },
        toAdd(target) {
            this.$router.push(target)
        },
        showAddress(index) {
            let item =  this.addressList[index]
            let query = {
                user_id: item.user_id,
                id: item.id,
                name: item.name,
                tel: item.phone,
                province: item.province,
                city: item.city,
                county: item.area,
                addressDetail: item.address,
                postalCode: item.zipcode,
                isDefault: Boolean(item.is_default),
            }
            this.$router.push({path: '/address-edit' ,query})
        },
        async deleteAddress(index) {
            const Dialog = this.$dialog.confirm({ message: '你确定删除此订单' })
            Dialog.then(res => {
                this.requestDelete(index, this.addressList[index].id)
            })
            
        },
        async setDeafult(index) {
            let res = await this.$api.setDeafult(LoginRegister.getLoginInfo().token,{is_default: this.addressList[index].is_default}, this.addressList[index].id)
            console.log(res);
            if (res.data.error_msg === 'ok') {
                Toast.success('设置默认成功!')
            } else {
                Toast.fail('设置默认失败!')
            }
        },
        async requestDelete(index, id) {
            let res = await this.$api.deleteAddress(LoginRegister.getLoginInfo().token,id)
            console.log('deleteAddress', res);
            if (res.data.error_msg === 'ok') {
                this.addressList.splice(index, 1)
                Toast.success('删除成功')
            } else {
                Toast.fail('删除失败!')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#address-list{
    width: 100%;
    font-size: 0;
    ul{
        padding: 0 0.2rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        li{
            margin-top: 0.2rem;
            padding: 0 0.2rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            background-color: #fff;
            .user-info{
                padding: 0.2rem 0rem;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                font-size: 0.32rem;
                color: #2b2b2b;
            }
            .user-address{
                padding-bottom: 0.2rem;
                display: flex;
                flex-direction: row;
                font-size: 0.28rem;
                border: none;
                border-bottom: 1px solid #e5e5e5;
                span:first-child{
                    color: #8fc321;
                }
                span:last-child{
                    padding-left: 0.1rem;
                    color: #2b2b2b;
                }
            }
            .user-action{
                padding: 0.2rem 0rem;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .is-default{
                    span{
                        font-size: 0.24rem;
                        color: #8fc321;
                    }
                    span.default{
                        padding-left: 0.1rem;
                        font-size: 0.26rem;
                        color: #2b2b2b;
                    }
                }
                .action-detail{
                    span:first-child{
                        padding-left: 0.1rem;
                        color: #2b2b2b;
                        font-size: 0.26rem;
                    }
                    span:first-child::before{
                        font-size: 0.3rem;
                        color: #999999;
                    }
                    span:last-child{
                        padding-left: 0.1rem;
                        padding-left: 0.3rem;
                        font-size: 0.26rem;
                        color: #2b2b2b;
                    }
                    span:last-child::before{
                        font-size: 0.3rem;
                        color: #999999;
                    }
                }
            }
        }
    }
    .btn-add_address{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0.98rem;
        font-size: 0.3rem;
        color: #ffffff;
        background-color: #8fc321;
    }
}
</style>