import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// !将刚才编写的axis进行导入
import axios  from '@/api/http'
// 需要将对应的内容挂在到vue的原型上（后续使用的时候不需要每次都import）
// ! $http是名称   this.$http = axios
Vue.prototype.$http = axios

// *定义事件中心
// Vue.prototype.$eventBus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
