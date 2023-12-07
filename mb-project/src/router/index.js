import { createRouter, createWebHashHistory  } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory (import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/Faq',
      name: 'Faq',
      component: () => import('../views/Faq.vue')
    },
    {
      path: '/List',
      name: 'List',
      component: () => import('../views/List.vue')
    },
    {
      path: '/News',
      name: 'News',
      component: () => import('../views/News.vue')
    },
    {
      path: '/Success',
      name: 'Success',
      component: () => import('../views/Success.vue')
    },
   
    {
      path: '/:catchAll(.*)',  //不是本项目定义的路由都会跳转到404
      name: '404',
      component: () => import('../views/404.vue')
    }
  ]
})

export default router
