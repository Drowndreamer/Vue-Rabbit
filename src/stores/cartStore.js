import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const addCart = (product) => {
    const index = cartList.value.findIndex(item => item.skuId === product.skuId)
    if(index !== -1){
      cartList.value[index].count += product.count
    } else {
      cartList.value.push(product)
    }
  }
  const delCart = (skuId) => {
    cartList.value = cartList.value.filter(item => item.skuId !== skuId)
  }
  //统计所有件数
  const totalCount = computed(() => {
    return cartList.value.reduce((pre, cur) => pre + cur.count, 0)
  })
  //统计所有金额
  const totalPrice = computed(() => {
    return cartList.value.reduce((pre, cur) => pre + cur.price * cur.count, 0)
  })
  return {
    cartList,
    addCart,
    delCart,
    totalCount,
    totalPrice
  }
},
{
  persist: true
})