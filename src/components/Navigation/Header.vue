<template>
<!-- 绑定class ,语法 ：class="{样式名称:Vue里面的数据}"-->
  <div :class="{ header:isSticky}">
    <!-- 使用头部导航菜单 -->
    <van-tabs line-width="55px" v-model="active" @click="onClick">
      <van-tab title="正在热映"></van-tab>
      <van-tab title="即将上映"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
// !导入头部导航组件
import Vue from "vue";
import { Tab,Toast,tabs } from "vant";

Vue.use(Tab);
Vue.use(tabs);

export default {
    data(){
        return {
            // ?设置选中的默认值
            active:0,
            // ?设置点击的路径
            urls:["/films/nowPlaying","/films/comingSoon"],
            // 用于决定头部信息是否显示
            isSticky:false
        }
    },
    // 生命周期，用于解决刷新的时候索引进行更改
    // *this.$route是路由的信息
    created(){
      // 纠正因为刷新而导致的选项卡选中错误的情况
        this.active = this.urls.indexOf(this.$route.path)
    },
    // 2 在生命周期mounted里面获取滚动条的高度，用于决定头部信息是否显示
    mounted(){
      // 监听滚动事件
      window.addEventListener("scroll",() => {
        // 滚动条滚动的时候获取高度
        let scrollTop = document.documentElement.scrollTop
        // console.log(scrollTop);
        // 当滚动的高度大于150的时候设置头部信息显示
        if(scrollTop >= 150){
          // 显示
          this.isSticky = true
        }else{
          // 不显示
          this.isSticky = false
        }
        
      })
    },
    methods: {
        // !本身具有两个参数，第一个参数是索引，第二个参数是点击的文本内容
    onClick(index) {
    //    *编程式导航
      this.$router.push(this.urls[index])
      
    },
  },
};
</script>

<style lang="scss" scoped>
// scopen表示局部样式，不会牵扯其他组件
.header{
  position: fixed;
    z-index: 999;
    width: 100%;
}

</style>
//!由于收不导航只是在电影模块中使用，因此将这个文件导出到电影模块的父组件里面，views/Films/Index.vue文件中
