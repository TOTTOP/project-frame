import axios from "axios";
import { ElMessage } from "element-plus";
import {
  useUserStore
} from '@/stores/user';
import router from "@/router";

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

service.interceptors.request.use((config) => {
    // 获取token添加至请求头
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })

service.interceptors.response.use((response) => {
  const res = response.data
  if (res.code !== 200) {
    if (res.code == 401 || res.code === 403) {
      const userStore = useUserStore()
      userStore.logout()
      router.push('/login')
    } else {
      return res.data
    }
  }
}, error => {
  const status = error.response ? error.response.status : null
  const statusCode = [400, 401, 403, 404, 500]
  if (statusCode.includes(status)) {
    ElMessage.error('请求失败')
  }
  return Promise.reject(error)
})

export default service
