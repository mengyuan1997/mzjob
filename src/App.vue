<template>
  <div id="app">
    

    <!-- 底部导航 使用单标签的时候必须带有/才可以-->
    <Footer v-show="isShow"></Footer>
    <router-view/>
     
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
    // *创建数据，确定是否显示底部导航
    data(){
      return {
        isShow:true
      }
    },
    // !导入之后先进性注册，然后在进行使用
    components:{
      Footer,
    },

    // ?发送请求是生命周期第二个里面进行发送
    created(){
      // !测试网络请求是否能够使用
      // this.$http.get(uri.getCities).then(ret => console.log(ret));
    // ! 监听导航是否开启事件，在生命周期中接受一个参数，用于接收子组件传递来的参数
      this.$eventBus.$on("show_jiaojiao",(flag) => {
        // *修改是否显示
        this.isShow = flag
      })
    },
    

  }
</script>
