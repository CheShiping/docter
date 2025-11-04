// ：token请求头携带，错误响应处理，401错误处理
// baseURL 导出的目的是啥？

// 其他模块可能需要使用
// 为什么使用函数 useXxxStore 函数，建议在拦截器使用？

// 模块中的话，store可能还没初始化
// 业务成功是什么意思？

// 响应成功，且后台业务操作完毕
import router from "@/router";
import { useUserStore } from "@/stores";
import axios, {AxiosError, type Method } from "axios";
import { showToast } from "vant";

const baseURL = 'https://consult-api.itheima.net/'
const instance = axios.create({
  // 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 请求拦截器，携带token
instance.interceptors.request.use(
  (config) => {
    // 携带token
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers['Authorization'] = `Bearer ${store.user?.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器，剥离无效数据，401拦截
instance.interceptors.response.use(
  (res) => {
    // 处理业务失败
    // 摘取核心响应数据
    if (res.data?.code !== 10000) {
      showToast(res.data?.message || '业务失败')
      return Promise.reject(res.data)
    }
    // 业务逻辑成功，返回响应数据，作为axios成功的结果
    return res.data
  },
  (err) => {
    // 处理401错误
    if (err.response.status === 401) {
      // 删除用户信息
      const store = useUserStore()
      store.delUser()
      // 跳转登录，带上接口失效所在页面的地址，登陆完成后会跳使用
      router.push({
        path: '/login',
        query: {returnUrl: router.currentRoute.value.fullPath}
      })
    }
    return Promise.reject(err)
  }
)

type Data<T> = {
  code: number
  message: string
  data: T
}

// 导出一个通用的请求工具函数
// const request = (url: string, method: Method = 'GET', submitData?: object) => {
//   return instance.request({
//     url,
//     method,
//     [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
//   })
// }

// 这个需要替换axsio.request默认的响应成功后的结果类型
// 之前是：传 { name: string } 然后res是   res = { data: { name: string } }
// 但现在：在响应拦截器中返回了 res.data  也就是将来响应成功后的结果，和上面的类型一致吗？
// 所以要：request<数据类型，数据类型>() 这样才指定了 res.data 的类型
// 但是呢：后台返回的数据结构相同，所以可以抽取相同的类型
const request = <T>(url: string, method: Method = 'get', submitData?: object) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export { baseURL, instance, request}
