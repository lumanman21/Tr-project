import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import createStore  from './store/index'
//请求地址
import urls from './api/api.js'
//请求方法
import request from './api/request.js'
import './tool/rem.js'
import './tool/header.js'

const app = createApp(App)


app.config.globalProperties.$urls = urls; // 全局挂载axios
app.config.globalProperties.$request = request;

app.use(router)
app.use(createStore)
app.use(ElementPlus)

app.mount('#app')
