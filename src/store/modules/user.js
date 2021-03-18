import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken() // 设置token初始状态   token持久化 => 放到缓存中
}
const mutations = {
  setToken(state, token) {
    state.token = token // 修改state的数据
    setToken(token) //   同步缓存
  },
  removeToken(state, token) {
    state.token = null // 把vuex数据置空
    removeToken() //清除缓存
  }
}
const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data)
    if (result.success) {
      //登录成功
      context.commit('setToken', result.data.data)
      resolve() // 表示执行成功了
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
