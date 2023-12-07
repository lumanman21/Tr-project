import { createRouter, createWebHashHistory } from "vue-router"

// const Login = () => import("../pages/Login.vue")
// const HomeContent = () => import("../pages/HomeContent.vue")

// 配置映射
const routes = [
  {
    path: "/",
    // redirect: "/homecontent",
    component: import(/* webpackChunkName: "HomeContent" */ "@/pages/HomeContent.vue"),
  },
  {
    path: "/login",
    component: import(/* webpackChunkName: "Login" */ "@/pages/Login.vue"),
  },
  // {
  //   path: "/homecontent",
  //   component: import(/* webpackChunkName: "HomeContent" */ "@/pages/HomeContent.vue"),
  // },
]

// 创建一个路由对象router
const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export default router
