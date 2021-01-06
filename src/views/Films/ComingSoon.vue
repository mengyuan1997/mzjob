<template>
  <div>
    <!-- 添加一个大盒子，解决最下面一个信息不显示问题 -->
    <div class="dianyingBox">
      <!--!之前的占位! <h2>正在热播</h2>  -->
      <!-- 设置下滑刷新，并获取数据 -->
      <van-list
        v-model="isLoading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 设置loading -->
        <!-- <div class="loading" v-show="isLoading"> -->
        <!-- 通过type进行更改样式 -->
        <!-- <van-loading type="spinner" size="24px" color="#0094ff"
            >加载中...</van-loading
          >
        </div> -->

        <!-- 商品信息，进行遍历 -->
        <van-card v-for="item in list" :key="item.filmId">
          <!-- 进行自定义设置图片 -->
          <template #thumb class="imgbox">
            <img :src="item.poster" width="66px" />
          </template>
          <!-- 自定义电影名称 -->
          <template #title>
            <div class="title">
              {{ item.name }}
              <!-- 标题后面的2D和3D -->
              <span> {{ item.filmType.name }} </span>
            </div>
          </template>
          <!-- 自定义电影介绍 -->
          <template #desc>
            <div class="desc">
              <div>主演：{{ item.actors | parseActors }}</div>
              <div>上映日期 {{item.premiereAt | parsePremiereAt}} </div>
              <div>{{ item.nation }} | {{ item.runtime }}分钟</div>
              <div class="nowPlayingFilm-buy">购票</div>
            </div>
          </template>
        </van-card>
      </van-list>
    </div>
  </div>
</template>

<script>
// !这里需要请求数据，因此先将uri进行导入
import uri from "@/config/uri";

// *导入并注册需要的组件
import Vue from "vue";
// ? Toast是错误提示信息  Card是商品卡片
import { Loading, Toast, Card, List } from "vant";

Vue.use(Loading); //loading插件
Vue.use(Toast); //失败信息提示
Vue.use(Card); //商品卡片
Vue.use(List); //下滑刷新

// 导入moment包
import moment from "moment";

export default {
  data() {
    return {
      // *定义一个数组，用于存放获取到的信息
      list: [],

      // loading效果是否显示，默认情况下是显示的
      isLoading: true,
      // *下拉刷新时的loading
      // isLoading2: true,
      // *获取数据的时候默认是获取第一页的数据
      pageNum: 1,
      // *表示数据是否加载完毕
      finished: false,
    };
  },
  methods: {
    // 下滑刷新的方法
    onLoad() {
      // ?测试是否可以执行这个方法
      // console.log('下拉刷新');
      // 在这里发送数据，获取新的数据，直接进行调用数据获取方法
      this.getData();
    },
    // todo 由于在声明周期中已经获取过一次数据了，如果在获取一次，代码会重复，因此将获取数据在设置成一个方法
    getData() {
      // ! this.$http 与axios 相同
      // *通过代理的方式获取正在上映的数据信息
      // * 发送请求之后查看是否获取到信息

      // 2  因为这是一个方法，所以需要附带一个参数，默认情况下是第一页。正在热播的请求方式可以是GET也可以是POST，使用GET，直接在地址后面拼接参数
      this.$http
        .get(uri.getComingSoon + "?pageNum=" + this.pageNum)
        .then((ret) => {
          // 判断是否获取到信息
          // console.log(ret);
          if (ret.status == 0) {
            // 1在这里进行判断，是否达到最大的张数
            if (this.pageNum <= Math.ceil(ret.data.total / 10)) {
              // //表示获取到信息,ret表示获取到的数据，真正需要的数据在ret里面的data中的films中，将数据复制到data中的list中，便于下面尽心遍历循环
              // 3数据请求成功之后，将数据放置到this.list中，由于不知道这是第几次获取的，因此list中可能会具有数据，将刚获取的数据和之前的数据整合在一起，并将刚获取到的数据放到前面
              // 2 合并数据的方式，将数组进行展开，然后进行拼接
              // this.list = ret.data.films;
              this.list = [...ret.data.films, ...this.list];
              // 2 将数据合并之后，将默认的页数进行修改，为下一次做准备
              this.pageNum++;
            }else{
              this.finished = true
            }
          } else {
            // 表示没有获取到信息
            // 设置一个提示插件，在上面进行引入并注册
            Toast.fail("数据跑丢了");
          }
          // 数据加载完成，无论是否能够请求到信息，loading都应该消失
          this.isLoading = false;
          // !同时将加载数据的loading设置隐藏
          this.isLoading2 = false;
        });
    },
  },
  // !设置过滤器
  filters: {
    // *在过滤器中处理演员信息
    parseActors(actors) {
      // !由于卖座网的数据可能存在部分电影没有主演，因此进行一个判断
      if (actors) {
        // 表示具有演员
        // ? 定义一个空字符串，用于接收演员信息
        var str = "";
        // 对演员信息进行遍历，获取演员的名称
        actors.forEach((el) => {
          // 演员之间添加一个空格
          str += el.name + " ";
        });
        // 遍历循环完成之后将获取到的演员信息进行返回,由于信息较多，因此剪取一部分进行此案时，并在最后添加省略号
        return str.substr(0, 14) + "...";
      } else {
        // 表示没有演员，直接返回“暂无主演”
        return "暂无主演";
      }
    },
    // *处理时间
    parsePremiereAt(timestamp){
      // *定义一个数组，用于表示周几，在处理时间的时候使用0-6表示周天-周六
      const arr =["周日",
                "周一",
                "周二",
                "周三",
                "周四",
                "周五",
                "周六",]
        // 2 获取周几
        // 3返回接口是秒，而插件moment的单位值毫秒
        const week = arr[moment(timestamp * 1000).format("d")]
        // 2获取日
        const day = moment(timestamp * 1000).format("D")
        // 2获取月
        const month = moment(timestamp * 1000).format("M")
        // 1 进行拼接字符串
        return `${week} ${month}月${day}日`;

    }
  },
  // 声明周期，用于发送请求
  created() {
    // 3 在这里直接进行调用获取数据的方法

    this.getData();
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

img {
  border-radius: 0;
}
.title {
  font-size: 16px;
  color: #191a1b;
  line-height: 22px;
  margin-left: -20px;
  span {
    font-size: 9px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 14px;
    padding: 0 2px;
    border-radius: 2px;
  }
}
.dianyingBox {
  // 对列表外面最大的盒子进行设置也给margin-bottom，使最下面的一个系信息进行显示
  margin-bottom: 50px;
  .desc {
    margin-left: -20px;
    font-size: 13px;
    margin-top: 4px;
    color: #797d82;
    position: relative;
    div:nth-of-type(1) {
      span {
        color: #ffb232;
        font-size: 14px;
      }
    }
    div:nth-of-type(4) {
      line-height: 25px;
      height: 25px;
      width: 50px;
      color: #ff5f16;
      font-size: 13px;
      text-align: center;
      border-radius: 2px;
      position: absolute;
      border: 1px solid #ff5f16;
      left: 82%;
      top: 15%;
      border-radius: 4px;
    }
  }
}
</style>
