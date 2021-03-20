import Layout from '@/layout'
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: '/social', // 路径
  name: 'social', // 给路由规则加一个name
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [
    {
      path: '',
      component: () => import('@/views/social'), // 按需导入

      meta: {
        title: '社保',
        icon: 'table'
      }
    }
  ]
}
