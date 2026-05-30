//axios 封装
import axios from 'axios'
import { ElMessage } from 'element-plus' 
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'
// const userStore = useUserStore()
// const { userInfo, clearUserInfo } = userStore
import { useRouter } from 'vue-router'
const router = useRouter()
// 创建axios实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 20000
})

//拦截器
// 1. 从pinia中获取token
httpInstance.interceptors.request.use(
  config => {
    //需要时导入userStore
    
 console.log('请求拦截器执行了', config.url)
    const userStore = useUserStore()
    const { userInfo } = userStore
    if(userInfo.token){
      config.headers.Authorization = `Bearer ${userInfo.token}`
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
      //先判断 error.response 是否存在
      message: error.response?.data.message || '请求失败'
    })
    //401token失效处理
    //1. 清除本地用户数据
    //2. 跳转到登录页
    //导入clearUserInfo方法
    const userStore = useUserStore()
    const { clearUserInfo } = userStore
    if(error.response?.status === 401){
      clearUserInfo()
      router.push('/login')
    }

    return Promise.reject(error)
  }
)

// 导出axios实例
export default httpInstance
