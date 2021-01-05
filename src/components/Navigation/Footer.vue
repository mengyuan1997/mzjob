<template>
  <div>
    <!-- 底部导航HTML部分 需要添加事件绑定-->
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" @change="changeItem">
      <van-tabbar-item icon="home-o">电影</van-tabbar-item>
      <van-tabbar-item icon="search">影院</van-tabbar-item>
      <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// ? 將底部导航插件继续拧导入
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  data() {
    return {
      // ? 底部导航的默认索引，默认选中第一个
      active: 0,
    //   *定义一个数组，表示底部导航的三个地址
    urls:["/films/nowPlaying", "/cinemas", "/center"]
    };
  },
//   生命周期-创造，在这个生命周期里面进行纠正刷新之后索引变成0的问题
  created(){
        // *对active进行设置值
        // *this.$route表示当前路由信息，里面具有path代表当前的地址，在数组中查找这一个看看是数组里面的第几个
        // console.log(this.$route);
        this.active = this.urls.indexOf(this.$route.path)
  },
methods:{
    // 点击导航更改地址栏里面的地址，接受一个参数，表示数组的索引
    changeItem(index){
        this.$router.push(this.urls[index])
    }

}
};

</script>
