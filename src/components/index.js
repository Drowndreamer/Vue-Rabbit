//通过插件方式进行全局注册组件
import ImageView from './ImageView/index.vue' 
import XtxSku from './XtxSku/index.vue'
export const componentsPlugin = { 
  install(app) {
    app.component('XtxImageView', ImageView)
    app.component('XtxSku', XtxSku)
  } 
}
