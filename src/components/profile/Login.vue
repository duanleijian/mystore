<template>
    <div id="back">
        <common-header ref="header"></common-header>
        <div id="login">
        <h2>登录</h2>
            <div class="content">
                <p>
                    <strong><span class="iconfont icon-shoujihaoma"></span></strong>
                    <input type="text" placeholder="请输入手机号码" v-model="loginInfo.username">
                </p>
                <p>
                    <strong><span class="iconfont icon-mima"></span></strong>
                    <input type="password" placeholder="请输入密码" v-model="loginInfo.password">
                </p>
                <button @click="login">登录</button>
            </div>
            <div class="redirect">
                <router-link to="" tag="a">找回密码</router-link>
                <router-link to="/register" tag="a" >注册新账户</router-link>
            </div>
        </div>
        <img :src="imgUrl" alt="无法显示该图片">
    </div>
    
     
</template>
<script>
import {UserValidator} from '../../validate/UserValidator'
import LoginRegister from '../../storage/LoginRegister'
import CommonHeader from '../common/Header'
// import { CellGroup } from 'vant'
export default {
    name: 'Login',
    created() {
        this.isLogin()
    },
    mounted() {
        this.$refs.header.isReturn = true
        this.$refs.header.content = '登录'
    },
    data() {
        return {
            imgUrl: require('../../assets/img/login-bg.png'),
            loginInfo: {
                username: '',
                password: ''
            }
        }
    },
    components: {
        CommonHeader
    },
    methods: {
        isLogin() {
            if (LoginRegister.hasLoginInfo()) {
                this.$router.push({path: '/profile', query: LoginRegister.getLoginInfo()})
            }
        },
        login() {
            let msg = UserValidator.loginVd({
                username: this.loginInfo.username,
                password: this.loginInfo.password
            })
            if (typeof msg === 'string') {
                this.$toast.fail(msg)
            } else {
                msg? this.requestLogin() : this.$toast.fail('手机号或密码格式错误!')
                
            }
        },
        async requestLogin() {
            let res = await this.$api.login({
                username: this.loginInfo.username,
                password: this.loginInfo.password,
            })
            console.log('loginResult', res);
            if (res.data.error_msg === "ok"){
                this.$toast.success('登录成功')
                LoginRegister.setLoginInfo({
                    token: res.data.data.token
                })
                if(this.$route.meta.toPath.endsWith('profile')) {
                    this.$router.push({path: '/profile', query: {token: res.data.data.token}})
                } else {
                    this.$router.push(this.$route.query.redirect)
                }
                
            } 
            if (res.data.error_msg === "账号不存在") {
                this.$toast.fail('账号不存在')
            }
            if (res.data.error_msg === "密码错误") {
                this.$toast.fail('密码错误')
            } 
            
        }
    }
}
</script>
<style lang="scss" scoped>

#back{
    width: 100%;
    height: 100%;
    img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
}
#login{
    position: relative;
    margin-top: 2.1rem;
    margin-left: auto;
    margin-right: auto;
    width: 5.4rem;
    height: 5.2rem;
    
    h2{
        font-size: 0.3rem;
        font-weight: 600;
        text-align: center;
        line-height: 0.86rem;
        height: 0.86rem;
        color: #666666;
        border-radius: 0.1rem 0.1rem 0 0;
        background-color: #eeeeee;
    }
    .redirect{
        position: absolute;
        bottom: -0.5rem;
        width: 100%;
        height: 0.5rem;
        line-height: 0.5rem;
        padding:0 0.2rem;
        box-sizing: border-box;
        // border: 1px solid pink;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        a{
            font-size: 0.24rem;
            color: #e6e6e6;
        }
    }
    .content{
        position: absolute;
        top: 0.86rem;
        left:0;
        right:0;
        margin-left: auto;
        margin-right: auto;
        padding: 0 0.4rem;
        box-sizing: border-box;
        height: calc(100% - 0.86rem);
        background-color: #fff;
        border-radius: 0 0 0.1rem 0.1rem;
        // overflow: hidden;
        font-size: 0;
        p{
            margin-top: 0.55rem;
            position: relative;
            height: 0.6rem;
            font-size: 0;
            strong{
                font-weight: normal;
                position: absolute;
                top: 50%;
                left: 0.2rem;
                // width: 0.4rem;
                height: 0.4rem;
                margin-top: -0.2rem;
                font-size: 0;
                span{
                    font-size: 0.4rem;
                    color: #8f8f8f;
                }
            }
            input{
                text-indent: 0.8rem;
                font-size: 0.28rem;
                font-weight: normal;
                color: #999999;
                width: 100%;
                height: 100%;
                border: none;
                border-bottom: 1px solid #cccccc;
            }
        }
        button{
            margin-top: 0.65rem;
            width: 100%;
            height: 0.8rem;
            font-size: 0.3rem;
            background-color: #8fc321;
            color: #ffffff;
        }
        
        
    }
}
</style>