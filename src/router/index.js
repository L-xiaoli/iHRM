import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/layout'
// 引入多个模块的规则
import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'
import userRouter from './modules/user'
// 静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/import',
    component: Layout,
    hidden: true, // 隐藏在左侧菜单中
    children: [
      {
        path: '', // 二级路由path什么都不写 表示二级默认路由
        component: () => import('@/views/import/index')
      }
    ]
  },
  userRouter // 放置都可以访问的静态路由

  // 404 page must be placed at the end !!!
  // ! 将404放在所有路由后面（src/permision.js）
  // { path: '*', redirect: '/404', hidden: true }
]
// 静态路由
export const asyncRoutes = [
  departmentsRouter, // 组织架构
  employeesRouter, // 员工
  settingRouter, // 公司设置
  permissionRouter, // 权限管理
  socialRouter, // 社保
  attendancesRouter, // 考勤
  salarysRouter, // 工资
  approvalsRouter // 审批
]
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }), // 管理滚动行为 如果出现滚动 切换就让 让页面回到顶部
    routes: [...constantRoutes]
  })

const router = createRouter() // 临时合并所有的路由

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
