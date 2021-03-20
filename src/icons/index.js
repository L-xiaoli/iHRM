import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)

// require.context 是 Webpack 提供的 API
// 目录、是否遍历子目录、匹配文件的正则
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
//? 以上两行的代码意思：将所有的svg目录下的.svg后缀文件全部引入项目中
