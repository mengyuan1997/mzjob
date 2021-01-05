// todo 将需要的组件进行引入，否则会报错
import Films  from '@/views/Films/Index'//电影父组件
import  NowPlaying from '@/views/Films/NowPlaying'//电影正在上映组件
import  ComingSoon from '@/views/Films/ComingSoon'//电影即将上映组件
import  Detail from '@/views/Films/Detail'//电影详情页组件

// ?定义一个变量用于存放路由数组
let film = [ 
    // !由于电影模块模块是对象形式(两个对象)，因此需要在外面添加一个数组，在使用的时候（导入）需要展开（使用...语法）
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
     // ?正在热映路由
     path:"nowPlaying",
     component:NowPlaying,
   },
   {
     // ?即将上映路由
     path:"comingSoon",
     component:ComingSoon
   }
  ]
 },
 {
    path:"/film/:filmId",
    component:Detail
  },
]
// !最后导出定义的变量
export default film