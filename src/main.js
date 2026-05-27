import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { lazyPlugin } from './directives/index'
// 引入全局样式
import '@/styles/common.scss'

// 调用接口

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

//自定义指令 m-lazy
app.use(lazyPlugin)
