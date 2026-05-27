import request from '@/utils/http'

export const getCategoryAPI = (id) => {
  return request({
    url: '/category',
    method: 'GET',
    params: {
      id: id
    }
  })
}
