import Layout from '@/layout'
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: '/setting', // 路径
  name: 'setting', // 给路由规则加一个name
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [
    {
      path: '',
      component: () => import('@/views/setting'), // 按需导入
      // meta：路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
      meta: {
        title: '公司设置',
        icon: 'setting'
      }
    }
  ]
}
