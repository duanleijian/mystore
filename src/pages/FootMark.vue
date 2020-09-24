<template>
    <div id="foot-mark">
        <common-header ref="header"></common-header>
        <div class="date-plugin">
            <ul>
                <li v-for="(item, index) of historyTimes" :key="item.day" :class="{active: historyTimes[index].number}" >
                    <span class="week">{{item.week}}</span>
                    <span :class="{day: true, active: isCurrentDay(item.day)}">{{item.day}}</span>
                </li>
            </ul>
        </div>
        <div class="foot-list">
            <ul>
                <li v-for="(value,key) in historyListByDay" :key="key">
                    <div class="foot-item" v-for="item in historyListByDay[key]" :key="item.goods_id">
                        <img :src="item.goods_img" alt="无法显示该图片">
                        <span class="good-price">￥{{item.price}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    
</template>
<script>
import CommonHeader from '../components/common/Header'
import LoginRegister from '../storage/LoginRegister'
import { Toast } from 'vant'
export default {
    name: 'FootMark',
    components: {
        CommonHeader
    },
    created() {
        this.getHistoryTimes()
        
    },
    mounted() {
        this.$refs.header.isReturn = true
        this.$refs.header.content = this.$route.meta.title
    },
    data() {
        return {
            historyTimes: [],
            userHistory: {
                page: 1,
                count: 5,
                totalPage: -1
            },
            historyList: [],
            historyListByDay: {},
            navIndex: 0
        }
    },
    methods: {
        getNavIndex() {
            this.historyList.forEach((item, index) => {
                if (parseInt(item.day) == new Date().getDate()) {
                    this.navIndex = index
                }
            })
        },
        isCurrentDay(day) {
            return parseInt(day) === new Date().getDate()
        },
        setHistoryListByDay() {
            this.historyTimes.forEach((item, index) => {
                if (!this.historyListByDay[item.day]) {
                    this.historyListByDay[item.day] = []
                }
                this.historyList.forEach((el, cursor) => {
                    let day = String(el.day).substr(String(el.day).length - 2)
                    if (parseInt(day) == parseInt(item.day)) {
                        // this.historyListByDay[day].push(el)
                        let arr = this.historyListByDa[day]
                        arr.push(el)
                        Vue.set(this.historyListByDay, String([day]), arr)
                    }
                })
            })
            console.log('historyListByDay', this.historyListByDay);
        },
        async getHistoryTimes() {
            if (LoginRegister.hasLoginInfo()) {
                const token = LoginRegister.getLoginInfo().token
                let res = await this.$api.getHistoryTime(token)
                console.log(res);
                if (res.data.error_msg === 'ok') {
                    this.historyTimes = res.data.data
                    this.getNavIndex()
                    this.historyTimes.forEach((item,index) => {
                        this.historyList.push([])
                    })
                    this.getHistoryList()
                } else {
                    throw Error('足迹日期数据获取失败!', res.data.error_msg + res.data.error_code)
                }
            } else {
                Toast.fail('token过期或失效!')
                this.$router.push('/login')
            }
        },
        async getHistoryList() {
            if (LoginRegister.hasLoginInfo()) {
                const token = LoginRegister.getLoginInfo().token
                let res = await this.$api.getHistoryList(token, {
                    
                })
                console.log(res);
                if (res.data.error_msg === 'ok') {
                    this.historyList = res.data.data.list
                    this.setHistoryListByDay()
                } else {
                    throw Error('足迹浏览数据获取失败!', res.data.error_msg + res.data.error_code)
                }
            } else {
                Toast.fail('token过期或失效!')
                this.$router.push('/login')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#foot-mark{
    .date-plugin{
        ul{
            display: flex;
            flex-direction: row;
            align-items: center;
            background-color: #fff;
            li{
                // padding: 0.25rem 0rem;
                position: relative;
                height: 1.6rem;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                .week{
                    font-size: 0.3rem;
                    color: #999999;
                }
                .day{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 0.45rem;
                    height: 0.45rem;
                    
                    font-size: 0.26rem;
                    color: #333333;
                }
                span.active{
                   
                    color: #fff;
                    border-radius: 1rem !important;
                    background-color: #8fc321 !important;
                }
                &.active::after{
                    content: '';
                    position: absolute;
                    left: 50%;
                    margin-left: -0.03rem;
                    bottom: 0.05rem;
                    width: 0.06rem;
                    height: 0.06rem;
                    border-radius: 100px;
                    background-color: #8fc321;
                }
            }
        }
    }
    .foot-list{
        ul{
            display: flex;
            flex-direction: column;
            li{
                width: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                .foot-item{
                    float: left;
                    // width: 1.8rem;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    background-color: #fff;
                    border: 1px solid pink;
                    img{
                        width: 1.8rem;
                        height: 1.8rem;
                        border-radius: 0.05rem;
                    }
                    span{
                        padding: 0.15rem 0rem;
                        font-size: 0.28rem;
                        color: #ef8203;
                    }
                }
            }
        }
    }
}
</style>