import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入fastclick解决移动端延迟
import Fastclick from 'fastclick'
//导入vue-lazyload
import LazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'


Vue.config.productionTip = false

//安装toast插件
Vue.use(toast)
//调用Vue.use(toast)本质上会调用toast的install方法
//安装lazy
Vue.use(LazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

Fastclick.attach(document.body) //解决移动端300ms延迟 

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')