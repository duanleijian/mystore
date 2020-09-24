<template>
  <div id="app">
    <router-view></router-view>
  </div>
  
</template>

<script>

import Home from './pages/Home'
export default {
  name: 'app',
  data() {
    return {
      currentGoodCatagory: ''
    }
  }
}
</script>

<style>

</style>
