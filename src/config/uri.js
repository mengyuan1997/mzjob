// !该配置文件用于配置网络请求需要的url地址
// ? 集中管理地址，效率高

// todo 定义代理前缀
let prefix = "/api"
//  todo 模块化思想进行导出
export default {
    // *获取城市的信息
    getCities: prefix + "/getCitiesInfo",
    // *获取正在热映列表
    getNowPlaying: prefix + "/getNowPlayingFilmList",
    // *获取即将上映列表
    getComingSoon: prefix + "/getComingSoonFilmList",
    // ....
}