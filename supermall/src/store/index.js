import Vue from 'vue'
import Vuex from 'vuex'
import addCart from './module/addCart'

//1、安装插件
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        addCart
    }
})
