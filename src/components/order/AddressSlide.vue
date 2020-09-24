<template>
    <div id="slide">
        <div class="mask" v-show="mark"></div>
        <div class="box" v-if="addressList.length > 0">
            <ul>
                <li v-for="(item, index) of addressList" :key="item.id">
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
                    </div>
                </li>
            </ul>
            <button @click="confirmDefault">保存默认</button>   
        </div>
        
    </div>
</template>
<script>
import LoginRegister from '../../storage/LoginRegister'
import {Toast} from 'vant'
export default {
    name: 'AddressSlide',
    props: {
        addressList: Array
    },
    mounted() {
        window.onresize = () => {
            this.resetWH()
        }
    },
    updated() {
        if (!this.limit) {
            this.initConfig()
            this.getDefault()
            this.limit = 1
        }  
    },
    data() {
        return {
            w: '0px',
            h: '0px',
            box: null,
            mask: null,
            mark: false,
            limit: 0,
            addressInfo: {
                name: '',
                tel: '',
                address: ''
            },
            allowSelected: false
        }
    },
    methods: {
        initConfig() {
            let box = document.getElementsByClassName('box')[0]
            let mask = document.getElementsByClassName('mask')[0]
            this.box = box
            this.mask = mask
            this.resetWH()
            this.box.style.bottom = -this.box.offsetHeight + 'px'
        },
        resize() {
            this.w = parseInt(window.innerWidth) || document.documentElement.offsetWidth
            this.h = parseInt(window.innerHeight) || document.documentElement.offsetHeight
            this.box.style.width = this.w + 'px'
        },
        resetWH() {
            this.resize()
            window.onresize = () => {
                this.resize()
            } 
        },
        slideUp() {
            this.mark = !this.mark
            this.box.style.bottom = 0
        },
        slideDown() { 
            this.mark = !this.mark
            this.box.style.bottom = -this.box.offsetHeight + 'px'
        },    
        concatAddress(index) {
            let item = this.addressList[index]
            return item.province + item.city + item.area + item.address
        },
        getDefault() {
             this.addressList.forEach((item,index) => {
                if (item.is_default) {
                    this.addressInfo.address = this.concatAddress(index)
                    this.addressInfo.name = item.name
                    this.addressInfo.phone = item.phone
                }
             })
             this.$emit('getDefaultAddress', this.addressInfo)
        },
        toggleDefault(index) {
            if (this.addressList[index].is_default) {
                Toast.fail('默认地址必须存在!')
            } else {
                this.addressList.forEach(item => {
                    item.is_default = 0
                })
                this.addressList[index].is_default = 1
                this.getDefault()
                this.setDeafult(index) 
                
            } 
        },
        confirmDefault() {
            let condition = this.addressList.some(item => {
                return item.is_default === 1    
            })
            if (condition) {
                this.addressList.forEach((item,index) => {
                    if (item.is_default) {
                        this.addressInfo.address = this.concatAddress(index)
                        this.addressInfo.name = item.name
                        this.addressInfo.phone = item.phone
                    }
                })
                this.$emit('getDefaultAddress', this.addressInfo)
                
            } else {
                Toast('请至少选择一个默认地址!')
            }
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
    }
}
</script>
<style lang="scss" scoped>
#slide{
    display: flex;
    flex-direction: column;
    .mask{
        z-index: -1;
        background:rgba(0, 0, 0, 0.3);
        filter:alpha(opacity=30);
        opacity:0.3;
    }
    .box{
        padding-bottom: 0.2rem;
        position: fixed;
        left: 0;
        transition-property: bottom;
        transition-delay: 0s;
        transition-timing-function: ease-in-out;
        transition-duration: 0.5s;
        border-radius: 0.2rem 0.2rem 0 0;
        background-color: #fff;
        text-align: center;
        button{
            
            width: calc(100% - 1rem);
            height: 0.7rem;
            font-size: 0.3rem;
            color: #fff;
            border-radius: 1rem;
            background-color: #8fc321;
        }
        ul{
            padding: 0 0.2rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            max-height: 6rem;
            overflow: auto;
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
                    // padding: 0.2rem 0rem;
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
    }
    
}
</style>