import Vue from 'vue'
import Router from 'vue-router'
import carousel from './components/Home/header/carousel.vue'
import shoppingcenter from './components/Home/cart/shoppingcenter.vue'
import items from './components/Home/cart/items.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    linkActiveClass: "active",
    routes: [{
            path: '/',
            name: 'carousel',
            component: carousel
        },
        {
            path: '/header',
            name: 'header',
            component: () => import('./components/Home/header/header.vue')
        },
        {
            path: '/shoppingcenter',
            name: 'shoppingcenter',
            component: shoppingcenter,
            children: [{
                    path: 'cart',
                    name: 'cart',
                    component: () => import('./components/Home/cart/cart.vue'),

                },
                {
                    path: 'items',
                    name: 'items',
                    component: items
                }
            ]
        },
        //     {
        //     path: '/',
        //     name: 'practice',
        //     component: () => import('./components/Home/practice.vue')
        // }



    ]
})