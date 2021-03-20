// 导出属于员工的路由规则
import Layout from '@/layout'
//  {  path: '', component: '' }
export default {
  path: '/permission', // 路径
  name: 'permission', // 给路由规则加一个name
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [
    {
      path: '',
      component: () => import('@/views/permission'), // 按需导入
      // meta：路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
      meta: {
        title: '权限管理',
        icon: 'lock'
      }
    }
  ]
}
