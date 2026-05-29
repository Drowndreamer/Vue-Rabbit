import { ref, onUnmounted, computed } from 'vue'
import dayjs from 'dayjs'
export const useCountDown = () => {
  let timer = null
  const time = ref(0)
  const formatTime = computed(() => {
    return dayjs.unix(time.value).format('mm分ss秒')
  })
  const start = (curTime) => {
   time.value = curTime
   timer = setInterval(() => {
    time.value--
   }, 1000)
  }
  onUnmounted(() => {
    time.value && clearInterval(timer)
  })
  return {
    time,
    formatTime,
    start
  }
}
