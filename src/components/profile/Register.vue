<template>
    <div id="register">
        <common-header ref="header"></common-header>
        <div class="info">
            <h2>注册</h2>
            <p><strong><span class="iconfont icon-shoujihaoma"></span></strong><input type="text" placeholder="请输入手机号" v-model="registerInfo.username"></p>
            <p><strong><span class="iconfont icon-yanzhengma"></span></strong><input type="text" placeholder="请输入验证码"><i>获取验证码</i></p>
            <p><strong><span class="iconfont icon-mima"></span></strong><input type="password" placeholder="设置密码" v-model="registerInfo.password"></p>
            <p><strong><span class="iconfont icon-mima"></span></strong><input type="password" placeholder="确认密码" v-model="registerInfo.confirmPassword"></p>
            <button @click="register()">确定</button>
        </div>
        <img :src="imgUrl" alt="无法显示该图片">
    </div>
    

</template>
<script>
import {UserValidator} from '../../validate/UserValidator'
import CommonHeader from '../common/Header'
export default {
    name: 'Register',
    mounted() {
        this.$refs.header.isReturn = true
        this.$refs.header.content = '注册'
    },
    data() {
        return {
            imgUrl: require('../../assets/img/login-bg.png'),
            registerInfo: {
                username: '',
                password: '',
                confirmPassword: ''
            }
        }
    },
    components: {
        CommonHeader
    },
    methods: {
        register() {
            let msg = UserValidator.loginVd({
                username: this.registerInfo.username,
                password: this.registerInfo.password,
                confirmPassword: this.registerInfo.confirmPassword == this.registerInfo.password
            })
            if (typeof msg === 'string') {
                this.$toast.fail(msg)
            } else {
                msg? this.requestRegister() : this.$toast.fail('手机号或密码格式错误!')
                
            }
        },
        async requestRegister() {
            let res = await this.$api.register({
                username: this.registerInfo.username,
                password: this.registerInfo.password,
                nickname: '段雷健'
            })
            console.log('registerResult', res);
            if (res.data.error_msg === "ok"){
                this.$toast.success('注册成功')
                this.$router.push('/login')
            }
            if(res.data.error_msg === '昵称没有或者为空') {
                this.$toast.fail('昵称没有或者为空')
            } 
        }
    }
}
</script>
<style lang="scss" scoped>
#register{
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
.info{
    margin: 2.4rem auto;
    width: 5.4rem;
    height: 7.25rem;
    font-size: 0;
    text-align: center;
    border: 1px solid pink;
    background-color: #fff;
    border-radius: 0.1rem;
    h2{
        font-size: 0.3rem;
        color: #666666;
        text-align: center;
        line-height: 0.85rem;
        height: 0.85rem;
        background-color:#f0f0f0;
    }
    p{
        
        margin-top: 0.2rem;
        padding: 0 0.5rem;
        box-sizing: border-box;
        position: relative;
        width: 100%;
        height: 0.95rem;
        // border:1px solid pink;
        font-size: 0;
        
        strong{
            position: absolute;
            height: 0.4rem;
            left: 0.6rem;
            top: 50%;
            margin-top: -0.2rem;
            span{
                font-size: 0.4rem;
                color: #8f8f8f;
            }
        }
        input{
            width: 100%;
            height: 100%;
            font-size: 0.3rem;
            text-indent: 0.75rem;
            color: #999999;
            border: none;
            border-bottom: 1px solid #999999;
        }
        i{
            position: absolute;
            top: 50%;
            margin-top: -0.12rem;
            right: 0.5rem;
            font-size: 0.24rem;
            color: #8fc321;
        }
        
    }
    button{
        margin-top: 0.6rem;
        width: calc(100% - 1rem);
        height: 0.8rem;
        font-size: 0.3rem;
        color: #ffffff;
        background-color: #8fc321;
        border-radius: 0.1rem;
    }
}
</style>