// 负责全局自定义组件的注册
import PageTools from './pageTools/index'
export default {
  install(Vue) {
    // 组件注册
    Vue.component('PageTools', PageTools)
  }
}
