import Vue from 'vue'
import Vuex from 'vuex'

// 导入模块
import user  from './modules/user'

// 导入模块
import global  from './modules/global'

Vue.use(Vuex)

export default new Vuex.Store({
  //状态（数据源，存储需要共享数据的）
  state: {
    // *定义一个数据源
    num: 5,
    num2: 0,
    age: 17
  },
  //用于存放修改状态的方法的（同步）
  mutations: {
    // 定义一个方法，用于修改数据，需要修改数据的时候直接调用这个方法
    setNum(state, arg) {
      state.num += arg
    },
    setNum2(state, arg) {
      state.num2 += arg
    },
  },
  //用于存放修改状态的方法的（异步），其实actions最终还是调用的mutations
  actions: {
    asyncSetNUm2(context, arg) {
      // * 调用方式需要是异步程序
      setTimeout(() => {
        // !  最终调用的是mutations里面的方法
        // * context代表的是Store对象。
        context.commit("setNum2", arg)
      }, 1000);

    }
  },
  //用于存储对数据进行加工处理的方法的（类似于vue实例中计算属性）
  getters: {
    // * 一个方法  ，具有一个形参，形参就是原对象
    // * 用于对数据源的数据进行加工
    ageIsAdult(state) {
      // !需要将结果返回出去
      return state.age >= 18 ? "成年了" : "未成年"
    }
  },
  //用于存放模块（从当前前面四个中抽离出去形成的模块）的
  modules: {
    user,
    global,
  } 
})