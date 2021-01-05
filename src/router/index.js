import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  // !设置重定向
  {
    path:"/",
    redirect:"/films/nowPlaying"
  },
  // **根据路由分化设置路由，设置万路由之后在变下组件
  // 电影模块
	//  电影模块父---------/films
	// 	  正在热映---------/films/nowPlaying
	// 	  即将上映---------/films/comingSoon
  // 电影详情---------/film/:filmId
  // ?电影分类设置路由
  {
    // 编写电影模块父，也就是电影模块里面的父路由
    path:"/films",
    component:Films,
    // 在父路由里里面编写子路由，子路由写在“children”里面，children是一个数组
   children:[
    {
      // !需要注意：子路由的path中的路径不能添加“/”，否则会报错，添加/后表示从根开始查找
      path:"nowPlaying",
      component:nowPlaying,
    },
    {
      path:"comingSoon",
      component:comingSoon
    }
   ]

  },
  // !电影详情页面路由，带有一个参数Id
  {
    path:"/film/:filmId",
    component:Detail
  },
//   影院模块--------/cinemas
// ?影院模块
{
  path:"/cinemas",
   component:Cinemas
},
// 我的模块------/center
// ?我的模块
{
  path:"/center",
  component:Center
}

 //   {
    //     path: '/about',
    //     name: 'About',
    //     **route level code-splitting
    //     ** this generates a separate chunk (about.[hash].js) for this route
    //     ** which is lazy-loaded when the route is visited.
    //     ** 坑：回头再获取路由信息的时候可能会出错（异步加载路由）
    //    ** component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    //   }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router

