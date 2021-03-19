import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo, getUserDetailById, logout } from '@/api/user'

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
    const result = await login(data)
    context.commit('setToken', result) // 提交到mutations
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
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
