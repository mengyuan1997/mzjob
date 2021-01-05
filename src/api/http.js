// !封装axios
// todo 将axios进行导入
import axios  from 'axios'

/* 
* axios响应结果的处理进行封装：（响应拦截器）
* Axios的网络请求返回结果是在返回的ret的data属性中，每次获取数据的时候都是需不要ret.data比较麻烦，将其封装。如果返回结果中有“ret.data”就直接返回ret.data，如果没有就返回ret
*/
// !参数ret就是请求结果返回的ret
axios.interceptors.response.use((ret) => {
    // todo 进行响应的拦截处理
    // 将ret.data换成ret
    // ?使用短路表达式
    return ret.data || ret;
    // if (ret.data) {
    //     return ret.data;
    // } else {
    //     return ret;
    // }
});


/* 
*Axios请求的处理进行封装：（请求拦截器）
*由于每次都是需要携带jwt，每次携带参数都是放置到请求头中，因此对其进行封装，让每次都是自动添加到请求头中。
*/
// ? cfg是config的简写
// axios.interceptors.request.use((cfg) => {

// });


// !最后将axios进行导出
export default axios