<template>
  <div id="app">
    

    <router-view/>
    <!-- 底部导航 使用单标签的时候必须带有/才可以-->
    <Footer />
  </div>
</template>

<style lang="scss">

</style>

<script>
// todo 导入uri地址模块（测试网络请求是否能够使用）
// import uri  from '@/config/uri'
//  todo 导入底部导航组件
import Footer  from '@/components/Navigation/Footer'

  export default {
    // !导入之后先进性注册，然后在进行使用
    components:{
      Footer,
    },

    // ?发送请求是生命周期第二个里面进行发送
    created(){
      // !测试网络请求是否能够使用
      // this.$http.get(uri.getCities).then(ret => console.log(ret));
    }
  }
</script>
