import router from '@/router' // 引入路由实例
import store from '@/store' // 引入vuex store实例
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404'] // 定义白名单  所有不受权限控制的页面
// 路由的前置守卫
router.beforeEach(async function(to, from, next) {
  NProgress.start() // 开启进度条
  //  首先判断有无token
  if (store.getters.token) {
    // ? 1.有token 继续判断是不是去登录页
    if (to.path === '/login') {
      //  表示去的是登录页
      next('/') // 跳到主页
    } else {
      //  放行才去获取用户资料
      if (!store.getters.userId) {
        // 如果没有id这个值 才会调用 vuex的获取资料的action
        // async 函数所return的内容 用 await就可以接收到
        const { roles } = await store.dispatch('user/getUserInfo')
        // 为什么要写await 因为我们想获取完资料再去放行
        // ! 筛选用户的可用路由
        // actions中函数 默认是Promise对象 调用这个对象 想要获取返回的值话 必须 加 await或者是then
        // actions是做异步操作的
        const routes = await store.dispatch(
          'permission/filterRoutes',
          roles.menus
        )
        // routes就是筛选得到的动态路由
        // 动态路由 添加到 路由表中 默认的路由表 只有静态路由 没有动态路由
        // addRoutes  必须 用 next(地址) 不能用next()
        // 添加动态路由到路由表  铺路
        // ! 将404放在所有路由后面
        router.addRoutes([
          ...routes,
          {
            path: '*',
            redirect: '/404',
            hidden: true
          }
        ])
        // 添加完动态路由之后
        next(to.path) // 相当于跳到对应的地址  相当于多做一次跳转 为什么要多做一次跳转
        // 进门了，但是进门之后我要去的地方的路还没有铺好，直接走，掉坑里，多做一次跳转，再从门外往里进一次，跳转之前 把路铺好，再次进来的时候，路就铺好了
      } else {
        next() // 直接放行
      }
    }
  } else {
    // ? 2.没有token
    if (whiteList.indexOf(to.path) > -1) {
      // 如果找到了 表示在在名单里面
      next() // 放行
    } else {
      next('/login') // 重新到登录页
    }
  }
  NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})
// 后置守卫
router.afterEach(function() {
  NProgress.done() // 关闭进度条
})
