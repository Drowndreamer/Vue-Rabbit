import { ref } from 'vue'
import { defineStore } from 'pinia'
import  getCategoryAPI  from '@/apis/layoutNav.js'

export const useCategoryStore = defineStore('category', () => {
  // 定义状态
  const categoryList = ref([])
  const getCategory = async () => {
  // 发送请求前可以做事
    const res = await getCategoryAPI()  
    categoryList.value = res.result
    // 发送请求后可以做事
    console.log('getCategory', categoryList.value)
  }
  return { categoryList, getCategory }
})
