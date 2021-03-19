const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 建立用户名称的映射(在根级的getters上)
  name: state => state.user.userInfo.username // 建立用户名称的映射
}
export default getters
