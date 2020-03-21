<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // const apipath = process.env.APIPATH;
    // const apiname = process.env.API;
    // this.$http.get(`${apipath}/api/${apiname}/products`).then(response => {
    //   console.log(response.data);
    // });
  },
  
};
</script>

<style lang='scss'>
  @import './assets/all'
</style>
