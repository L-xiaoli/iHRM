import store from '@/store'
//  做一个混入对象
export default {
  // 混入对象是Z组件的选项对象
  methods: {
    // key :要检查的点（去用户信息的points找）
    checkPermission(key) {
      const { userInfo } = store.state.user
      if (userInfo.roles.points && userInfo.roles.points.length) {
        return userInfo.roles.points.some(item => item === key)
      }
      // 没有进入if就是没权限
      return false
    }
  }
}
