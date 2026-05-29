import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const { userInfo } = userStore
  
  const isLogin = computed(() => userInfo.token || false)

  const cartList = ref([])
  //添加商品到购物车
  const addCart = async (product) => {
    if(isLogin.value){
      const {skuId, count} = product
      await insertCartAPI({skuId, count})
      //添加购物车成功后，刷新购物车列表
      const res = await findNewCartListAPI()
      cartList.value = res.result

    }else{
      const index = cartList.value.findIndex(item => item.skuId === product.skuId)
      if(index !== -1){
        cartList.value[index].count += product.count
      } else {
        cartList.value.push(product)
      }
    }
  }
  const delCart = async (skuId) => {
    if(isLogin){
      await delCartAPI([skuId])
      //删除购物车成功后，刷新购物车列表
      const res = await findNewCartListAPI()
      cartList.value = res.result || []

    }else{
      cartList.value = cartList.value.filter(item => item.skuId !== skuId)
    }
  }
  //统计所有件数
  const totalCount = computed(() => {
    return cartList.value.filter(Boolean).reduce((pre, cur) => pre + cur.count, 0)
  })
  //统计所有金额
  const totalPrice = computed(() => {
    return cartList.value.filter(Boolean).reduce((pre, cur) => pre + cur.price * cur.count, 0)
  })
  const singleCheck = (skuId, val) => {
    const index = cartList.value.findIndex(item => item.skuId === skuId)
    if(index !== -1){
      cartList.value[index].selected = val
    }
  }
  //是否全选
  const isAll = computed(() => {
    return cartList.value.every(item => item.selected)
  })
  //全选/取消全选
  const allCheck = (val) => {
    cartList.value.forEach(item => {
      item.selected = val
    })
    //所有商品数量
  }
      const allCount = computed(() => cartList.value.reduce((pre, cur) => pre + cur.count, 0))
    //已选择数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((pre, cur) => pre + cur.count, 0))
    //已选择金额
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((pre, cur) => pre + cur.price * cur.count, 0))
  //清楚购物车
  const clearCart = () => {
    cartList.value = []
  }
  const updateCartList = async () => {
    // 合并购物车成功后，刷新购物车列表
    const res = await findNewCartListAPI()
    cartList.value = res.result || []
  }
  return {
    cartList,
    addCart,
    delCart,
    totalCount,
    totalPrice,
    singleCheck,
    isAll,
    allCheck,
    allCount,
    selectedCount,
    selectedPrice,
    clearCart,
    updateCartList
  }
},
{
  persist: true
})