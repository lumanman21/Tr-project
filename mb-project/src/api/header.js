import axios from "axios";



//创建通用axios配置
let instance = axios.create({
    responseType:'json',
    headers:{'Content-Type':'application/json'},
   
})


//请求拦截
instance.interceptors.request.use(config => {
    return config
})



//响应拦截
instance.interceptors.response.use(res => {
    return res.data
},error => {
    return Promise.reject(error)
})



export default instance