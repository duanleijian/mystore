<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>
<script>
import TabBarItem from './TabBarItem'
export default {
    name: 'TabBar',
    components: {
        TabBarItem
    },
    created() {
        
    },
    mounted() {
        this.setChildIndex()
        this.initSelected()
    },
    data() {
        return {}
    },
    methods: {
        setChildIndex() {
            this.$children.forEach((item, index) => {
                this.$children[index].nowIndex = index
            })
        },
        initSelected() {
            this.$children[0].toggleSelected()
        },
        getTabIndex(index) {
            this.$emit('getTabIndex', index)
        }
    }
}
</script>
<style lang="scss" scoped>
#tab-bar{
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    #tab-bar-item{
        flex-grow: 1;
    }
}
</style>