import request from '@/utils/http'

export const getOrderAPI = (orderId) => {
  return request({
    url: `/member/order/${orderId}`,
    method: 'GET',
  })
}