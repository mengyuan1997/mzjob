<template>
  <!-- 设置HTML结构 -->
  <div>
    <!-- 用于显示最上面的海报图片 -->
    <div class="poster">
      <button class="ret" @click="goBack"></button>
      <!-- 2.3 使用懒加载，将之前的“src”修改成“v-lazy”，属性值是需要显示的图片 -->
      <!-- <img src="" alt=""> -->
      <img v-lazy="filmInfo.poster" width="100%" />
    </div>
    <!-- 用于显示电影的介绍和详情 -->
    <div class="film">
      <!--3 设置电影介绍和详情 -->
      <!-- 设置标题 -->
      <div class="title">
        {{ filmInfo.name }}
        <!-- 标题后面的2D和3D -->
        <!--3.3 这里使用的数据中心的数据，知己使用能够实现，但是会报错，因此在data接受到的数据中定义一下  -->
        <span> {{ filmInfo.filmType.name }} </span>
        <i>{{ filmInfo.grade }}<em>分</em></i>
      </div>
      <!-- 设置电影类型 -->
      <div class="movie">{{ filmInfo.category }}</div>
      <!-- 设置上映时间 -->
      <div class="movie">{{ filmInfo.premiereAt | parsePermiereAt }}上映</div>
      <!-- 设置上映地区和时长 -->
      <div class="movie">
        {{ filmInfo.nation }} | {{ filmInfo.filmInfo }}分钟
      </div>
      <!-- 设置影片详情 -->
      <div class="synopsis">{{ filmInfo.synopsis }}</div>
    </div>
    <!-- 用于显示演职人员 -->
    <div class="Actors">
      <p>演职人员</p>
      <!-- 4 演员使用组件，进行使用组件 -->
      <!-- 在做演职人员显示的时候，需要注意滚动列表二次渲染的问题，因此将数据的长度进行动态绑定 -->
      <Actors :key="filmInfo.actors.length">
        <!-- 这里是给插槽填坑的，显示在插槽中  -->
        <div
          class="swiper-slide have"
          v-for="(item, index) in filmInfo.actors"
          :key="index"
        >
          <img :src="item.avatarAddress" width="85" />
          <p>{{ item.name }}</p>
          <span> {{ item.role }} </span>
        </div>
      </Actors>
    </div>
    <!-- 用于显示剧照 -->
    <div></div>
  </div>
</template>
<script>
// 4 将轮播图组件进行导入
import Actors from "@/views/Films/Actors";
// 1 将uri进行导入，用于获取数据
import uri from "@/config/uri";

// 1 .2导入vant的Toast
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
// 2 最上面的海报图片使用懒加载，使用第三方插件，安装命令 npm i
// 2.1导入懒加载
import VueLazyload from "vue-lazyload";
// 2.2 使用懒加载
Vue.use(VueLazyload, {
  // * loading是设置懒加载的图片地址
  loading: "http://r6d.cn/YsxL",
});
// 3.1 导入moment，进行整理上映时间
import moment from "moment";

// ?  控制底部导航是否显示，使用Vuex的map方法进行导入
import { mapMutations }  from 'vuex'

export default {
  data() {
    return {
      // 1.3 定义一个数据用于接收获取到的数据,由于传递过来的是一个对象因此定义一个对象
      // 3.3 在渲染演员的时候，需要使用里面的一个数据，因此在这里直接进行定义
      filmInfo: { filmType: [], actors: [] },
    };
  },
  methods: {
// * 进行映射，第一个参数表示模块名称，第二个是需要使用的方法
...mapMutations("global",["setFooter"]),


    // *点击返回
    goBack() {
      this.$router.back();
    },
  },
  // 注册组件
  components: {
    Actors,
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
      .get(uri.getDetail + "?filmId=" + this.$route.params.filmId)
      //  * 获取到id之后进行判断
      .then((ret) => {
        // 判断是否具有数据
        if (ret.status == 0) {
          // console.log(1);
          // 1.3 表示获取成功，在data中定义一个数组，用于接收获取到的数据
          this.filmInfo = ret.data.film;
        } else {
          // 1.2请求出现问题，向用户说明，在这里用到了 错误提示插件，因此需要在前面进行导入
          Toast.fail(ret.msg);
        }
      });

    // *进入的时候将底部导航进行隐藏
    // this.$eventBus.$emit("show_jiaojiao", false);

    // * 修改导航进行隐藏
    this.setFooter(false)
  },
  // *在离开的时候将底部导航进行显示
  beforeDestroy() {
    // this.$eventBus.$emit("show_jiaojiao", true);

     // * 修改导航进行显示
    this.setFooter(true)

  },
};
</script>
<style lang="scss" scoped>
//* 设置海报的样式

.poster {
  width: 375px;
  height: 210px;
  overflow: hidden;
  position: relative;
  .ret {
    background: url(https://img.rruu.net/image/5ff6c287e10d0);
    background-size: 30px 30px;
    width: 30px;
    height: 30px;
    position: relative;
    top: 10px;
    left: 10px;
    z-index: 999;
    border: 0;
  }
  img {
    position: relative;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
}
//* 设置电影介绍样式
//  2设置标题
.film {
  height: 180px;
  padding: 12px 15px 0px 15px;
  box-sizing: border-box;

  .title {
    width: 345px;
    font-size: 18px;
    color: #191a1b;
    height: 24px;
    line-height: 24px;
    background-color: #fff;
    span {
      margin-left: 7px;
      font-size: 9px;
      color: #fff;
      background-color: #d2d6dc;
      height: 14px;
      line-height: 14px;
      padding: 0 2px;
      border-radius: 2px;
    }
    i {
      float: right;
      color: #ffb232;
      font-size: 18px;
      font-style: italic;
      em {
        font-style: none;
      }
    }
  }
  // 2 设置电影类型、上映时间、上映地区和时长
  .movie,
  .synopsis {
    font-size: 13px;
    color: #797d82;
    margin-top: 4px;
  }
  .synopsis {
    height: 38px;
    margin-top: 12px;
    overflow: hidden;
    text-align: justify;
  }
}
// * 电影演职人员
.Actors {
  > p {
    //  width: 100%;
    padding: 15px;
    font-size: 20px;
    line-height: 22px;
    margin: 0px;
  }
  .have {
    display: flex;
    flex-direction: column;
    > p {
      font-size: 12px;
      margin-top: 10px;
      margin-bottom: 0px;
      color: #191a1b;
    }
    span {
      font-size: 10px;
      color: #797d82;
    }
  }
}
</style>
