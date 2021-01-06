<template>
<!-- 设置HTML结构 -->
  <div>
    <!-- 用于显示最上面的海报图片 -->
    <div>
      <!-- 2.3 使用懒加载，将之前的“src”修改成“v-lazy”，属性值是需要显示的图片 -->
      <!-- <img src="" alt=""> -->
      <img v-lazy="filmInfo.poster" width="100%" height="100px"/>
    </div>
    <!-- 用于显示电影的介绍和详情 -->
    <div>
      <!--3 设置电影介绍和详情 -->
      <!-- 设置标题 -->
      <div class="title">
          {{ filmInfo.name }}
          <!-- 标题后面的2D和3D -->
          <!--3.3 这里使用的数据中心的数据，知己使用能够实现，但是会报错，因此在data接受到的数据中定义一下  -->
          <span> {{ filmInfo.filmType.name }} </span>
          <i>{{ filmInfo.grade }}</i>
        </div>
        <!-- 设置电影类型 -->
        <div>{{ filmInfo.category }}</div>
        <!-- 设置上映时间 -->
        <div>{{ filmInfo.premiereAt | parsePermiereAt  }}上映</div>
        <!-- 设置上映地区和时长 -->
        <div>{{ filmInfo.nation}} | {{filmInfo.filmInfo}}分钟 </div>
        <!-- 设置影片详情 -->
        <div>{{ filmInfo.synopsis}}</div>
    </div>
    <!-- 用于显示演职人员 -->
    <div></div>
    <!-- 用于显示剧照 -->
    <div></div>
      
  </div>
</template>
<script>
// 1 将uri进行导入，用于获取数据
import uri  from '@/config/uri'

// 1 .2导入vant的Toast
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);

// 2 最上面的海报图片使用懒加载，使用第三方插件，安装命令 npm i
// 2.1导入懒加载
import VueLazyload from 'vue-lazyload'
// 2.2 使用懒加载
Vue.use(VueLazyload, {
  // * loading是设置懒加载的图片地址
    loading: "http://r6d.cn/YsxL",
});
// 3.1 导入moment，进行整理上映时间
import moment from "moment";

  export default {
    data(){
      return {
        // 1.3 定义一个数据用于接收获取到的数据,由于传递过来的是一个对象因此定义一个对象
        // 3.3 在渲染演员的时候，需要使用里面的一个数据，因此在这里直接进行定义
        filmInfo:{ filmType : [] ,actors :[] }
      }
    },

    filters: {
      // 3.2 使用moment，设置需要的时间
        parsePermiereAt(timestamp) {
            // * 注意时间单位的转换
            return moment(timestamp * 1000).format("YYYY-MM-DD");
        },
    },
    // 1 .1获取数据请求，在生命周期created里面进行获取
    created() {
        // 请求数据
        this.$http
        //  *请求方式可以是GET也可以是POST，使用GET，直接在地址后面进行传参， this.$route是获取当前路由信息 params表示参数
        .get(uri.getDetail + '?filmId=' + this.$route.params.filmId)
        //  * 获取到id之后进行判断
        .then(ret => {
          // 判断是否具有数据
          if(ret.status == 0){
            // console.log(1);
            // 1.3 表示获取成功，在data中定义一个数组，用于接收获取到的数据
            this.filmInfo = ret.data.film

          }else{
            // 1.2请求出现问题，向用户说明，在这里用到了 错误提示插件，因此需要在前面进行导入
            Toast.fail(ret.msg)
          }
        })
    },
  }
</script>