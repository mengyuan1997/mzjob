<template>
  <div>
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
            urls:["/films/nowPlaying","/films/comingSoon"]
        }
    },
    // 生命周期，用于解决刷新的时候索引进行更改
    // *this.$route是路由的信息
    created(){
        this.active = this.urls.indexOf(this.$route.path)
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

//!由于收不导航只是在电影模块中使用，因此将这个文件导出到电影模块的父组件里面，views/Films/Index.vue文件中
