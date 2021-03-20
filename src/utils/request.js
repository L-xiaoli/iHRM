// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import router from '@/router'
import store from '@/store'
// import { config } from '@vue/test-utils'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 3600 // Token有限时间（2H）
// 创建一个axios的实例
const service = axios.create({
  // 执行npm run dev =>去找process.env.VUE_APP_BASE_API  => /api  =>为'/api'时会触发代理
  baseURL: process.env.VUE_APP_BASE_API, // 当为production时为生产环境 为development时为开发环境
  timeout: 5000 // 定义5秒超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      // 只有在有token的情况下 才有必要去检查时间戳是否超时
      if (IsCheckTimeOut()) {
        // true表示 过期超时了，Token没用了
        store.dispatch('user/logout') // 登出操作
        router.push('/login') // 跳转到登录页
        return Promise.reject(new Error('token超时了'))
      }
      // 如果token存在 注入token
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    // axios默认加了一层data
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      Message.error(message) // 提示错误信息
      return Promise.reject(new Error(message)) // 实例化一个错误信息
    }
  },
  error => {
    // error 信息 里面 response的对象
    // 当等于10002的时候 表示 后端告诉我token超时了
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 10002
    ) {
      store.dispatch('user/logout') // 登出action 删除token
      router.push('/login')
    } else {
      Message.error(error.message) // 提示错误信息
    }

    return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
  }
)
// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}

// 导出axios实例
export default service
