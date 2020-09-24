<template>
    <div id="tab-bar-item" :class="{'line-active': isActive}" @click="toggleSelected">
        <slot name="item-text"></slot>
        <p></p>
    </div>
</template>
<script>
export default {
    name: 'TabBarItem',
    mounted() {
        
    },
    data() {
        return {
            isActive: false,
            nowIndex: -1
        }
    },
    methods: {
        toggleSelected() {
            let childs = this.$parent.$children
            childs.forEach(item => {
                item.isActive = false
            })
            this.isActive = true
            this.$emit('getTabIndex', this.nowIndex)
        }
    }
}
</script>
<style lang="scss" scoped>
#tab-bar-item{
    position: relative;
    height: 0.8rem;
    .item-text{
        display: block;
        text-align: center;
        line-height: 0.8rem;
        font-size: 0.28rem;
        color: #606060;
    }
    p{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: transparent;
    }
}
.line-active{
    .item-text{
        color: #8fc321 !important;
    }
    p{
        background-color: #8fc321 !important;
    }
}
</style>