<template>
  <div>
    <!-- 底部导航HTML部分 需要添加事件绑定-->
    <van-tabbar
      v-model="active"
      active-color="#ee0a24"
      inactive-color="#000"
      @change="changeItem"
    >
    <!-- 导航的每一项 -->
      <van-tabbar-item>
        <!-- 使用vant插件更改图标样式 -->
        <!-- 通过 class-prefix 指定类名，由于是使用的iconfont，因此按照iconfont方法进行设置-->
        <!-- 使用插槽，将图标进行设置成非行内 -->
        <van-icon class-prefix="iconfont icon-dianying" slot="icon" size="1.2rem" />
        <span>电影</span>
    </van-tabbar-item>
      <van-tabbar-item>
        <van-icon class-prefix="iconfont icon-yingyuan" slot="icon" size="1.2rem" />
        <span>影院</span>
    </van-tabbar-item>
      <van-tabbar-item>
        <van-icon class-prefix="iconfont icon-wode" slot="icon" size="1.2rem" />
        <span>我的</span>
    </van-tabbar-item>
      
    </van-tabbar>
  </div>
</template>

<script>
// !导入字体图标的css样式
import "@/assets/font/iconfont.css";

// ? 將底部导航插件继续拧导入
import Vue from "vue";
import { Tabbar, TabbarItem, Icon } from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
export default {
  data() {
    return {
      // ? 底部导航的默认索引，默认选中第一个
      active: 0,
      //   *定义一个数组，表示底部导航的三个地址
      
      urls: ["/films/nowPlaying",  "/cinemas", "/center"],
      
    };
  },
  //   生命周期-创造，在这个生命周期里面进行纠正刷新之后索引变成0的问题
  created() {
    //!修改bug：选中即将上映之后，再次刷新页面之后底部导航不会被选中
    // 1 方式1
    // if(this.$route.path == "/films/comingSoon"){
    //   this.changeItem(0)
    // // this.$router.push(this.urls[0])
    // }
    // 2 方式2 修改成三元表达式
    // this.active = this.urls.indexOf(this.$route.path) >=  0 ? this.urls.indexOf(this.$route.path) : 0;

    // *对active进行设置值
    // *this.$route表示当前路由信息，里面具有path代表当前的地址，在数组中查找这一个看看是数组里面的第几个
    // console.log(this.$route);   /films/comingSoon
    this.active = this.urls.indexOf(this.$route.path) >=  0 ? this.urls.indexOf(this.$route.path) : 0;

    // console.log(this.$route.path);
    
  },
  methods: {
    // 点击导航更改地址栏里面的地址，接受一个参数，表示数组的索引
    changeItem(index) {
      this.$router.push(this.urls[index]);
    },
  },
};
</script>
