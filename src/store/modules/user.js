import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router/index'

const state = {
  token: getToken(), // 设置token初始状态   token持久化 => 放到缓存中
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token // 修改state的数据
    setToken(token) //   同步缓存
  },
  removeToken(state) {
    state.token = null // 把vuex数据置空
    removeToken() // 清除缓存
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    // state.userInfo = { ...userInfo } // 浅拷贝（响应式）
    state.userInfo = userInfo // 修改state的数据（响应式）
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {} // 把vuex数据置空
  }
}
const actions = {
  // 登录操作
  async login(context, data) {
    // 调用api接口
    const result = await login(data) // 拿到Token
    context.commit('setToken', result) // 提交到mutations
    // 此时获取到了Token
    setTimeStamp() // 设置当前时间戳
  },
  //  获取用户信息
  async getUserInfo(context) {
    const userInfo = await getInfo()
    // 获取用户详情
    const baseInfo = await getUserDetailById(userInfo.userId)
    const baseResult = { ...userInfo, ...baseInfo }
    context.commit('setUserInfo', baseResult) // 提交到mutations
    return userInfo // 这里为什么要返回 为后面埋下伏笔
  },
  // 退出功能
  logout(context) {
    context.commit('removeToken') // 删Token
    context.commit('removeUserInfo') // 删资料
    resetRouter() // 重置路由
    // 设置权限模块下的为初始路由（子模块调用子模块都没加锁才可以）
    // mutations名称，payload载荷， { root: true }调用根级别的mutation或者action
    context.commit('permission/setRoutes', [], { root: true })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
