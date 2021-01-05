<template>
  <div id="app">
    <!-- vant导入测试 -->
    <van-cell title="选择单个日期" :value="date" @click="show = true" />
    <van-calendar v-model="show" @confirm="onConfirm" />

    <router-view/>
  </div>
</template>

<style lang="scss">

</style>

<script>
// todo 导入uri地址模块（测试网络请求是否能够使用）
// import uri  from '@/config/uri'
// !vant导入测试
import Vue from 'vue';
import { Calendar,Cell } from 'vant';

Vue.use(Calendar);
Vue.use(Cell);

  export default {
// !vant导入测试
data() {
    return {
      date: '',
      show: false,
    };
  },
  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
  },


    // ?发送请求是生命周期第二个里面进行发送
    created(){
      // !测试网络请求是否能够使用
      // this.$http.get(uri.getCities).then(ret => console.log(ret));
    }
  }
</script>
