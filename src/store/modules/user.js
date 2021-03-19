import { getToken, setToken, removeToken } from '@/utils/auth'
import { getInfo } from '@/api/user'

const state = {
  token: getToken(), // 设置token初始状态   token持久化 => 放到缓存中
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token // 修改state的数据
    setToken(token) //   同步缓存
  },
  removeToken(state, token) {
    state.token = null // 把vuex数据置空
    removeToken() //清除缓存
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    // state.userInfo = { ...userInfo } // 浅拷贝（响应式）
    state.userInfo = userInfo // 修改state的数据（响应式）
    setUserInfo(userInfo) //  同步缓存
  },
  // 删除用户信息
  removeUserInfo(state, userInfo) {
    state.userInfo = {} // 把vuex数据置空
    removeUserInfo() //清除缓存
  }
}
const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data)
    context.commit('setToken', result) // 提交到mutations
  },
  async getUserInfo() {
    const userInfo = await getInfo()
    context.commit('setUserInfo', userInfo) // 提交到mutations
    return result // 这里为什么要返回 为后面埋下伏笔
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
