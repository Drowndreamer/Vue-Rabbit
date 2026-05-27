// 自定义指令 m-lazy转化为插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app) {
    app.directive('m-lazy', {
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(
          el,
          ([{isIntersecting}]) => {
            if(isIntersecting) {
              el.src = binding.value
              stop()
            }
          },
        ) 
       }
    })
  }
}