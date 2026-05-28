import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { componentsPlugin } from './components'
import App from './App.vue'
import router from './router'
import { lazyPlugin } from './directives/index'
// 引入全局样式
import '@/styles/common.scss'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 调用接口

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.mount('#app')
//自定义指令 m-lazy
app.use(lazyPlugin)
// 自定义组件
app.use(componentsPlugin)
