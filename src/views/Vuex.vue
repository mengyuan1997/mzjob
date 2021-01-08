<template>
  <div>
      <h1>这是VueX组件</h1> 
      <button @click="clickHeadler">修改数据</button>
      <button @click="clickHeadler2">模块化</button>
  </div>
</template>

 <script>
// 1导入map系列方法
import {mapState,mapMutations,mapActions,mapGetters}  from 'vuex'
// import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

  export default {
    created(){
      // todo  获取数据源state里面的数据
      // !  this.$store是挂在到Vue实例上的vuex;this.$store.state获取到的就是state里面的数据，是一个对象，需要里面的数据直接“.数据名称”
      // console.log(this.$store.state.num);

      // !这种方式不能进行赋值


      
    },
    // 3计算属性
    computed:{
    //   // todo  获取数据源state里面的数据
    //   // 注意 用法是固定的，使用“...”加上方法名称,由于里面的数据具有多个，可能只想使用一部分，因此在括号里面添加一个数组，指定需要回去的数据，将名称放置在数组中，当获取到数据之后沪江渠道的数据映射成当前Vue实例的属性
    //   // *使用方法与data中的数据使用相同
      // ...mapState(['num','num2'])

          // !模块化映射,获取数据
    ...mapState("user",["username","age"]),
    
// !模块化映射,地数据进行加工
...mapGetters("user",["isAdult"]),
    },
    mounted(){
      // *使用映射之后的数据
      // console.log(this.num);

    },
    methods:{
// !模块化映射，同步修改数据
// ...mapMutations("user",["setName"]),

// !模块化映射，异步修改数据
// ...mapActions("user",["asyncSetAge"]),



      // todo 模块化形式
    clickHeadler2(){
    // this形式获取数据
    // console.log(this.$store.state.user.username)
    // map形式获取数据
    // console.log(this.username);

  // 同步修改数据Mutations模块化
  // this.$store.commit("user/setName","13456")
// // todo 同步map修改数据
// this.setName("map测试")

// // 异步修改数据actions模块化
// // this.$store.dispatch("user/asyncSetAge","异步")
// // // todo 同步map修改数据
// this.asyncSetAge("异步map测试")

// ! 模块化之后对数据加工
// todo this方式 
// console.log(this.$store.getters["user/isAdult"]);
// todo map的方式
console.log(this.isAdult);


    
    

    },



      // todo 修改数据
      clickHeadler(){
      //   // * 方法1  修改state里面的数据,第一个值是mutations定义的方法名，第二个值是修改的
      // // this.$store.commit("setNum",5)
      // // * 方法2 使用方法和使用自身的方法相同
      // // this.setNum(10)

      // // 1 方式1 异步调用方法 修改state里面的数据,第一个值是mutations定义的方法名，第二个值是修改的
      // // this.$store.dispatch("asyncSetNUm2",-10)
      // // * 方式2 使用映射
      // // this.asyncSetNUm2(-5)

      // // 1   方式1 对数据的进行加工getter
      // console.log(this.$store.getters.ageIsAdult);
      // // 1 方式2  使用映射的方式
      // console.log(this.ageIsAdult)

      },
      // // ?映射操作
      // ...mapGetters(["ageIsAdult"]),
      //   // *  在methods中使用mapMutations方法
      //   // ? 映射操作，需要在methods中书写  同步操作
      //   ...mapMutations(["setNum","setNum2"]),
      //   //? 异步操作，映射
      //   ...mapActions(["asyncSetNUm2","setNum2"])
      //   /* 
      //   * 使用的时候和使用自身的methods方法一样
      //   *this.setNum(数字)
      //   !数字表示增加的数据
      //   */
    }
  }
</script>