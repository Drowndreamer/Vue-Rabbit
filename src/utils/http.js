//axios 封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const { userInfo, clearUserInfo } = userStore

// 创建axios实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

//拦截器
// 1. 从pinia中获取token
const token = userInfo.token
httpInstance.interceptors.request.use(
  config => {
    if(userInfo.token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
httpInstance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    ElMessage.error({
      type: 'error',
      message: error.response.data.message
    })
    //401token失效处理
    //1. 清除本地用户数据
    //2. 跳转到登录页
    if(error.response.status === 401){
      clearUserInfo()
      $router.push('/login')
    }

    return Promise.reject(error)
  }
)

// 导出axios实例
export default httpInstance
