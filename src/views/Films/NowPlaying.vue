<template>
  <div>
    <!--!之前的占位! <h2>正在热播</h2>  -->
    <!-- 设置loading -->
    <div class="loading" v-show="isLoading">
      <!-- 通过type进行更改样式 -->
      <van-loading type="spinner" size="24px" color="#0094ff"
        >加载中...</van-loading
      >
    </div>
    <!-- 商品信息，进行遍历 -->
    <van-card v-for="item in list" :key="item.filmId">
      <!-- 进行自定义设置图片 -->
      <template #thumb class="imgbox">
          <img :src="item.poster" width="66px">
      </template>
      <!-- 自定义电影名称 -->
      <template #title>
        <div class="title">
          {{item.name}}
          <!-- 标题后面的2D和3D -->
          <span> {{item.filmType.name}} </span>
        </div>
      </template>
      <!-- 自定义电影介绍 -->
      <template #desc>
          <div class="desc">
            <div>观众评分 <span>{{item.grade}}</span> </div>
            <div>主演：{{item.actors | parseActors}}  </div>
            <div> {{item.nation}} | {{item.runtime}} </div>
            <div class="nowPlayingFilm-buy">购票</div>
          </div>
      </template>

    </van-card>
  </div>
</template>

<script>
// !这里需要请求数据，因此先将uri进行导入
import uri from "@/config/uri";

// *导入并注册需要的组件
import Vue from "vue";
// ? Toast是错误提示信息  Card是商品卡片
import { Loading, Toast, Card} from "vant";

Vue.use(Loading);
Vue.use(Toast);
Vue.use(Card);


export default {
  data() {
    return {
      // *定义一个数组，用于存放获取到的信息
      list: [],

      // loading效果是否显示，默认情况下是显示的
      isLoading: true,
    };
  },
  // !设置过滤器
  filters:{
    // *在过滤器中处理演员信息
    parseActors(actors){
      // !由于卖座网的数据可能存在部分电影没有主演，因此进行一个判断
      if(actors){
        // 表示具有演员
        // ? 定义一个空字符串，用于接收演员信息
        var str = ''
        // 对演员信息进行遍历，获取演员的名称
        actors.forEach(el => {
          // 演员之间添加一个空格
          str += el.name + " "
        });
        // 遍历循环完成之后将获取到的演员信息进行返回,由于信息较多，因此剪取一部分进行此案时，并在最后添加省略号
        return str.substr(0,14) + '...'
      }else{
        // 表示没有演员，直接返回“暂无主演”
        return "暂无主演"
      }
    }

  },
  // 声明周期，用于发送请求
  created() {
    // ! this.$http 与axios 相同
    // *通过代理的方式获取正在上映的数据信息
    // * 发送请求之后查看是否获取到信息
    this.$http.get(uri.getNowPlaying).then((ret) => {
      // 判断是否获取到信息
      // console.log(ret);
      if (ret.status == 0) {
        // 表示获取到信息,ret表示获取到的数据，真正需要的数据在ret里面的data中的films中，将数据复制到data中的list中，便于下面尽心遍历循环
        this.list = ret.data.films;
      } else {
        // 表示没有获取到信息
        // 设置一个提示插件，在上面进行引入并注册
        Toast.fail("数据跑丢了");
      }
      // 数据加载完成，无论是否能够请求到信息，loading都应该消失
      this.isLoading = false;
    });
  },
};
</script>

<style lang="scss" scoped>
// ! scoped表示样式只在当前组件中生效，对子组件不影响
.loading {
  text-align: center;
  margin-top: 10px;
  padding: 10px 0px;
  background: rgb(235, 233, 233);
}

img{
  border-radius: 0;
}
.title{
  font-size: 16px;
  color:#191a1b;
  line-height: 22px;
  margin-left:-20px;
  span{
    font-size: 9px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 14px;
    padding: 0 2px;
    border-radius: 2px;
  }
}
.desc{
  margin-left:-20px;
  font-size:13px;
  margin-top: 4px;
  color:#797d82;
  position: relative;
  div:nth-of-type(1){
    span{
      color: #ffb232;
    font-size: 14px;
    }
  }
div:nth-of-type(4){ 
    line-height: 25px;
    height: 25px;
    width: 50px;
    color: #ff5f16;
    font-size: 13px;
    text-align: center;
    border-radius: 2px;
    position: absolute;
    border: 1px solid #ff5f16;
    left:82%;
    top:15%;
    border-radius: 4px;
}
}
</style>
