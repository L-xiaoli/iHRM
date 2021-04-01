import Layout from '@/layout'
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: '/approvals', // 路径
  name: 'approvals', // 给路由规则加一个name
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'), // 按需导入
      // meta：路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
      meta: {
        title: '审批',
        icon: 'tree-table'
      }
    },
    {
      path: 'salaryApproval/:id',
      component: () => import('@/views/approvals/salary'),
      name: 'salaryApproval',
      hidden: true,
      meta: {
        title: '工资审核',
        icon: 'approval',
        noCache: true
      }
    },
    {
      path: 'enterApproval/:id',
      component: () => import('@/views/approvals/enter'),
      name: 'enterApproval',
      hidden: true,
      meta: {
        title: '入职审核',
        icon: 'approval',
        noCache: true
      }
    },
    {
      path: 'leaveApproval/:id',
      component: () => import('@/views/approvals/leave'),
      name: 'leaveApproval',
      hidden: true,
      meta: {
        title: '申请请假',
        icon: 'approval',
        noCache: true
      }
    },
    {
      path: 'quitApproval/:id',
      component: () => import('@/views/approvals/quit'),
      name: 'quitApproval',
      hidden: true,
      meta: {
        title: '申请离职',
        icon: 'approval',
        noCache: true
      }
    },
    {
      path: 'overtimeApproval/:id',
      component: () => import('@/views/approvals/overtime'),
      name: 'overtimeApproval',
      hidden: true,
      meta: {
        title: '加班申请',
        icon: 'approval',
        noCache: true
      }
    },
    {
      path: 'securitySetting',
      component: () => import('@/views/approvals/security'),
      name: 'securitySetting',
      hidden: true,
      meta: {
        title: '设置',
        icon: 'approval',
        noCache: true
      }
    }
  ]
}
