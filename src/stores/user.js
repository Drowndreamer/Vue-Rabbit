import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import { ref } from 'vue'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

export const useUserStore = defineStore('user', ()=>{
  const userInfo = ref({})
  const getUserInfo = async ({account, password}) => {
    const res = await loginAPI({account, password})
    userInfo.value = res.result
    // 合并购物车
    const cartStore = useCartStore()
    await mergeCartAPI(cartStore.cartList.map(item => ({
      skuId: item.skuId,
      count: item.count,
      selected: item.selected
    })))
    cartStore.updateCartList()
    // 合并完成后，清除本地购物车数据
    cartStore.clearCart()
  }
  const clearUserInfo = () => {
    userInfo.value = {}
    // 清除购物车
    const cartStore = useCartStore()

    cartStore.clearCart()
  }
  return {
    userInfo,
    getUserInfo,
    clearUserInfo  
  }
},  
  {
    persist: true
  }

)