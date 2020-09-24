<template>
    <div id="nav">
        <ul>
            <li :class="{'nav-active': 0 === nowIndex}" @click="changeIndex(0)">
                <span class="iconfont icon-icon_home"></span>
                <span>线上商城</span>
            </li>
            <li :class="{'nav-active': 1 === nowIndex}" @click="changeIndex(1)">
                <span class="iconfont icon-gouwuche"></span>
                <span>购物车</span>
            </li>
            <li :class="{'nav-active': 2 === nowIndex}" @click="changeIndex(2)">
                <span class="iconfont icon-wode"></span>
                <span>我的</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'NavBar',
    data() {
        return {
            nowIndex: 0
        }
    },
    methods: {
        changeIndex(index) {
            this.nowIndex = index
            switch(index) {
                case 0: this.$router.push('/home');break;
                case 1: this.$router.push('/shopcat');break;
                case 2: this.$router.push('/login');break;
            }
        }
    }
}
</script>
<style scoped>
#nav{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0.95rem;
    border:none;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
}
#nav ul{
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
#nav ul li{
    display: flex;
    flex-direction: column;
    align-items: center;
}
#nav ul li span:first-child{
    font-size: 0.4rem;
    color: #7f7f7f;
}
#nav ul li span:last-child{
    padding-top: 0.1rem;
    font-size: 0.2rem;
    color: #666666;
}
.nav-active span{
    color: #8fc321 !important;
}
</style>