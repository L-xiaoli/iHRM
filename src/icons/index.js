import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

// require.context 是 Webpack 提供的 API
// 目录、是否遍历子目录、匹配文件的正则
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

// req.keys() // 返回路径列表，例如 ["./dashboard.svg", "./example.svg"]
// req(key) // 代表引入一个个路径
// req.keys().forEach(key => req(key))
