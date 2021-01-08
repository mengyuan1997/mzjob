

export default ({
    namespaced:true,
    
    // //状态（数据源，存储需要共享数据的）
  state: {
    // 1控制底部导航是否显示
    isShowFooter:true

  },
  //用于存放修改状态的方法的（同步）
  mutations: {
    //   2设置底部导航是否显示，修改数据的方法
    setFooter(state,arg){
        state.isShowFooter = arg
    }
  },
  //用于存放修改状态的方法的（异步），其实actions最终还是调用的mutations
  actions: { },
  //用于存储对数据进行加工处理的方法的（类似于vue实例中计算属性）
  getters:{},
//   //用于存放模块（从当前前面四个中抽离出去形成的模块）的
//   modules: {}
})
