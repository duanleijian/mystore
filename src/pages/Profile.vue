<template>
    <div id="profile">
        <common-header ref="header"></common-header>
        <div class="person-center">
            <div class="header-info">
                <div class="head-portrait">
                    <van-uploader :before-read="beforeRead">
                        <img :src="userInfo.headImgUrl" alt="无法显示该图片">
                    </van-uploader>
                    <div class="other-info">
                        <span class="nickname">{{ userInfo.name }}</span>
                        <div>
                            <span class="iconfont icon-VIP"></span>
                            <span class="user-level">{{levelName()}}</span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="my-order">
                <h2>
                    <span>我的订单</span>
                    <span @click="$router.push('/order-list')">查看全部</span>
                    <span class="iconfont icon-youjiantou"></span>
                </h2>
                <div class="order-nav">
                    <ul>
                        <li><span class="iconfont icon-daifahuo"></span><span>待发货</span></li>
                        <li><span class="iconfont icon-fenqishangchengdaishouhuo"></span><span>待收货</span></li>
                        <li><span class="iconfont icon-yiwancheng"></span><span>已完成</span></li>
                        <li><span class="iconfont icon-shouhou"></span><span>售后</span></li>
                    </ul>
                </div>
            </div>
            <div class="primary-menu">
                <ul>
                    <li @click="toTarget('/my-coupon')">
                        <span class="iconfont icon-ticheng"></span>
                        <span>我的卡卷</span>
                        <span class="iconfont icon-youjiantou"></span>
                    </li>
                    <li>
                        <span class="iconfont icon-huiyuanzhongxin"></span>
                        <span>会员中心</span>
                        <span class="iconfont icon-youjiantou"></span>
                    </li>
                    <li @click="toTarget('/foot-mark')">
                        <span class="iconfont icon-xiaoxizhongxin"></span>
                        <span>我的足迹</span>
                        <span class="iconfont icon-youjiantou"></span>
                    </li>
                    <li @click="toTarget('/address')">
                        <span class="iconfont icon-shouhuodizhi"></span>
                        <span>收货地址</span>
                        <span class="iconfont icon-youjiantou"></span>
                    </li>
                </ul>
            </div>
        </div>
        <nav-bar ref="nav"></nav-bar>
    </div>
</template>
<script>
import Profile from '../storage/Profile'
import CommonHeader from '../components/common/Header'
import NavBar from '../components/common/NavBar'

export default {
    name: 'Profile',
    async created() {
        console.log('个人中心界面组件---created');
        this.isGetUserInfo()
    },
    mounted() {
        this.$refs.header.isReturn = true
        this.$refs.header.content = '个人中心'
        this.$refs.nav.nowIndex = 2
    },
    data() {
        return {
            userInfo: {
                headImgUrl: '',
                name: '',
                level: '',
                token: ''
                
            }
        }
    },
    computed: {
        
    },
    components: {
        CommonHeader,
        NavBar
    },
    methods: {
        isGetUserInfo() {
            if (Profile.hasUserInfo()) {
                Object.assign(this.userInfo, Profile.getUserInfo())
            } else {
                this.getUserInfo()
            }
        },
        async getUserInfo() {
            let res = await this.$api.getUserInfo(this.$route.query.token)
            console.log('user',res);
            if (res.data.error_msg == 'ok') {
                this.userInfo.headImgUrl = res.data.data.avatar
                this.userInfo.name = res.data.data.nickname
                this.userInfo.level = res.data.data.level
                this.userInfo.token = this.$route.query.token
                Profile.setUserInfo(this.userInfo)
            } else {
                this.$toast.fail('用户信息获取失败!')
            }
            
        },
        async beforeRead(file) {
            let rules = /\.(jpg|png|jpeg|gif)/, res = null
            if (rules.test(file.name)) {
                res = await this.$api.uploadHeaderImg(file, this.userInfo.token)
                console.log('headerImg', res);
                if (res.data.error_msg == 'ok') {
                    this.userInfo.headImgUrl = res.data.data.src
                } else {
                    this.$toast.fail('上传失败!')
                }
            } else {
                this.$toast.fail('文件类型必须是图片!')
            }
             console.log('file',file);
            
        },
        levelName() {
            let ln = ''
            switch(this.userInfo.level){
                case 0: ln = '普通';break
                case 1: ln = '1级';break
                case 2: ln = '2级';break
                case 3: ln = '3级';break
                case 4: ln = '超级';break
            }
            return ln
        },
        toTarget(target) {
            this.$router.push(target)
        }
    }
}
</script>
<style lang="scss" scoped>
.person-center{
    width: 100%;
    font-size: 0;
    .header-info{
        padding: 0.6rem 0.35rem;
        box-sizing: border-box;
        width: 100%;
        height: 2.4rem;
        background-color: #8fc321;
        .head-portrait{
            display: flex;
            flex-direction: row;
            img{
                display: block;
                width: 1.1rem;
                height: 1.1rem;
                border-radius: 1rem;
            }
            .other-info{
                padding-left: 0.2rem;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                font-size: 0.28rem;
                color: #fff;
                flex-direction: column;
                div{
                   
                    width: 1.1rem;
                    height: 0.36rem;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    align-items: center;
                    border-radius: 1rem;
                    background-color: #ef8203;
                    .icon{
                        font-size: 0.15rem;
                        color: #fff;
                    }
                    .user-level{
                        font-size: 0.2rem;
                        color: #fff;
                    }
                }
                .nickname{
                    text-align: center;
                } 
            }
        }
    }
    .my-order{
        margin-top: 0.2rem;
        width: 100%;
        font-size: 0;
        
        h2{
            padding: 0 0.2rem;
            box-sizing: border-box;
            height: 0.88rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            font-weight: normal;
            border: none;
            border-bottom: 1px solid #eeeeee;
            background-color: #fff;
            span:first-child{
                font-size: 0.28rem;
                color: #4d4d4d;
            }
            span:nth-child(2){
                flex-grow: 1;
                text-align: right;
                font-size: 0.24rem;
                color: #636363;
            }
            span:last-child{
                font-size: 0.24rem;
                color: #636363;
            }
        }
        .order-nav{
            width: 100%;
            height: 1.5rem;
            background-color:#fff;
            ul{
                display: flex;
                height: 100%;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                li{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    span:first-child{
                        font-size: 0.4rem;
                        color: #333333;
                    }
                    span:last-child{
                        padding-top: 0.2rem;
                        font-size: 0.26rem;
                        color: #636363;
                    }
                }
            }
        }
        
    }
    .primary-menu{
        margin-top: 0.2rem;
        width: 100%;
        ul{
            display: flex;
            flex-direction: column;
            li{
                padding: 0 0.2rem;
                box-sizing: border-box;
                width: 100%;
                height: 0.88rem;
                display: flex;
                flex-direction: row;
                align-items: center;
                border: none;
                border-bottom: 1px dashed #eeeeee;
                background-color: #fff;
                span:nth-child(1){
                    padding-right: 0.15rem;
                    font-size: 0.34rem;
                    color: #494949;
                }
                span:nth-child(2){
                    flex-grow: 1;
                    text-align: left;
                    font-size: 0.28rem;
                    color: #333333;
                }
                span:nth-child(3){
                    font-size: 0.24rem;
                    color: #636363;
                }
            }
        }
    }
}
</style>