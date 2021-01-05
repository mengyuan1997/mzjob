<template>
  <div>
      <!--—!之前的占位! <h2>电影父组件</h2>  -->
      <!-- 头部导航 -->
      <Header />
      <!-- 子组件占位 -->
      <router-view></router-view>
  </div>
</template>
<script>
// !顶部导航导入
import Header  from '@/components/Navigation/Header'

  export default {
    // 注册需要使用的组件
    components:{
      // 注册头部组件
      Header,
    }
  }
</script>