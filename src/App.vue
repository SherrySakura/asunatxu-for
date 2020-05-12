<template>
  <div class="layout">
    <Layout>
      <app-header></app-header>
      <router-view></router-view>
      <app-footer></app-footer>
    </Layout>
  </div>

</template>

<script>
  import router from "../js/router.js"
  import Header from "../src/components/Header.vue"
  import Footer from "../src/components/Footer.vue"
  export default {

    name: 'App',
    router,
    components: {
      "app-header": Header,
      "app-footer": Footer
    }
  }
</script>

<style lang="less">
  @import "../css/base.less";
</style>