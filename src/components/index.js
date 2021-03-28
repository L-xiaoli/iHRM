// 负责全局自定义组件的注册
import PageTools from './pageTools/index'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload/index'
import Print from 'vue-print-nb' // 打印

export default {
  install(Vue) {
    // 组件注册
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.use(Print)
  }
}
