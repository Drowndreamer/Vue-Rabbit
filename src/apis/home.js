import httpInstance from '@/utils/http'

export const getHomeBannerAPI = (params = {}) => {
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    method: 'GET',
    params: {
      distributionSite
    }
  })
}

export const getHomeNewAPI = () => {
  return httpInstance({
    url: '/home/new',
    method: 'GET'
  })
}

export const getHomeHotAPI = () => {
  return httpInstance({
    url: '/home/hot',
    method: 'GET'
  })
}

// product
export const getHomeProductAPI = () => {
  return httpInstance({
    url: '/home/goods',
    method: 'GET'
  })
}