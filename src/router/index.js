import Vue from 'vue'
import Router from 'vue-router'
import api from '@/core/api/index'
// console.log(global.getParam())


Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: '/',
    component: resolve => require(['@/components/home'], resolve),
    redirect: "index",
    children: [{
        path: 'index',
        name: 'index',
        meta:{
          keepAlive:false,
          title:"供电路径维护"
        },
        component: resolve => require(['@/components/main/info/index'], resolve)
      },{
      path: 'show',
      name: 'show',
      meta:{
        keepAlive:false,
        title:"供电路径展示"
      },
      component: resolve => require(['@/components/main/show/index'], resolve)
    },
      // {
      //   path: 'news',
      //   name: 'news',
      //   meta:{
      //     keepAlive:false,
      //     title:"我是新闻页"
      //   },
      //   component: resolve => require(['@/components/main/news'], resolve),
      //   children: [{
      //     path: 'childCom',
      //     name: 'childCom',
      //     component: resolve => require(['@/components/child/childCom'], resolve)
      //   }]
      // },
      // {
      //   path: 'test',
      //   name: 'test',
      //   component: resolve => require(['@/components/main/test'], resolve),
      //   meta:{
      //     title:"我是测试页"
      //   }
      // },
      // {
      //   path: 'msea/:id',
      //   name: 'msea',
      //   component: resolve => require(['@/components/main/msea'], resolve),
      // }
    ]
  }]
})



export default router;
