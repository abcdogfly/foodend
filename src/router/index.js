import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',/*主页*/
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path:'/',
                    redirect:'/userCommon'
                },
                {
                    path: '/userCommon',
                    component: resolve => require(['../components/home/userCommon.vue'], resolve)
                },
                {
                    path: '/cake',
                    component: resolve => require(['../components/goods/cake.vue'], resolve)
                },
                {
                    path: '/meat',
                    component: resolve => require(['../components/goods/cake.vue'], resolve)
                },
                {
                    path: '/candy',
                    component: resolve => require(['../components/goods/cake.vue'], resolve)
                },
                {
                    path: '/honey',
                    component: resolve => require(['../components/goods/cake.vue'], resolve)
                },
                {
                    path: '/nuts',
                    component: resolve => require(['../components/goods/cake.vue'], resolve)
                },
                {
                    path: '/milk',
                    component: resolve => require(['../components/goods/cake.vue'], resolve)
                },
                {
                    path: '/sea',
                    component: resolve => require(['../components/goods/cake.vue'], resolve)
                },
                {
                    path: '/puffed',
                    component: resolve => require(['../components/goods/cake.vue'], resolve)
                },
                {
                    path: '/bean',
                    component: resolve => require(['../components/goods/cake.vue'], resolve)
                },
                {
                    path: '/dailySale',
                    component: resolve => require(['../components/special/dailySale.vue'], resolve)
                },
                {
                    path: '/hotSale',
                    component: resolve => require(['../components/special/dailySale.vue'], resolve)
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path:'*',/*其他页面跳转到登录页*/
            redirect:'/'
        }
    ]
})
