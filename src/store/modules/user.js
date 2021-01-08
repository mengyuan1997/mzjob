// 模块化文件中的文件相对固定，进行导出
export default {
    // !设置命名空间
    namespaced:true,
    state:{
        // *数据
        username:"姓名",
        age:17,
    },
    mutations:{
        // *更改用户名
        setName(state,age){
            state.username = age
        },
        setAge(state,age){
            state.age += age
        }
    },
    actions:{
        // 异步修改
        asyncSetAge(context,age){
            setTimeout(()=>{
                context.commit('setAge',age)
            },1000)
        }
    },
    getters:{
        // 判断是否成年
        isAdult(state){
            return state.age >= 18 ? "成年了" : "未成年"
        }
    }
}