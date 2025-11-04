import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false,
})

// createRouter 创建路由实例，===> new VueRouter()
// history 是路由模式，hash模式，history模式
// createWebHistory() 是开启history模块   http://xxx/user
// createWebHashHistory() 是开启hash模式    http://xxx/#/user

// vite 的配置 import.meta.env.BASE_URL 是路由的基准地址，默认是 ’/‘
// https://vitejs.dev/guide/build.html#public-base-path
// 如果将来你部署的域名路径是：http://xxx/my-path/user
// vite.config.ts  添加配置  base: my-path，路由这就会加上 my-path 前缀了

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/Login/index.vue'), meta: { title: '登录' } },
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: { title: '首页' },
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue'),
          meta: { title: '健康百科' },
        },
        {
          path: '/notify',
          component: () => import('@/views/Notify/index.vue'),
          meta: { title: '消息通知' },
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue'),
          meta: { title: '个人中心' },
        },
      ],
    },
    {
      path: '/user/patient',
      component: () => import('@/views/User/PatientPage.vue'),
      meta: { title: '家庭档案' },
    },
  ],
})

// 访问权限控制
router.beforeEach(to => {
  // 进度条插件
  NProgress.start()
  // 用户仓库
  const store = useUserStore()
  // 不需要登录，白名单
  const whiteList = ['/login', '/register', '/404']
  // 如果没有登录且目标路径不在白名单内，则跳转到登录页
  if (!store.user?.token && !whiteList.includes(to.path)) {
    return '/login'
  }
  // 如果已登录且试图访问登录页，则重定向到首页
  if (store.user?.token && to.path === '/login') {
    return '/'
  }
})

// 切换路由设置标题
router.afterEach(to => {
  document.title = `${to.meta.title || ''}-优医问诊`
  // 路由切换完毕，关闭进度条
  NProgress.done()
})

export default router
