import Vue from 'vue'
import Router from 'vue-router'
import carousel from './components/Home/header/carousel.vue'
import shoppingcenter from './components/Home/cart/shoppingcenter.vue'
import items from './components/Home/cart/items.vue'
import cart from './components/Home/cart/cart.vue'
Vue.use(Router)

export default new Router({
    mode: 'hash',
    linkActiveClass: "active",
    routes: [{
            path: '/',
            name: 'carousel',
            component: carousel,
        },
        // {
        //     path: '/header',
        //     name: 'header',
        //     component: () => import( /* webpackChunkName:"header" */ './components/Home/header/header.vue')
        // },
        {
            path: '/shoppingcenter',
            name: 'shoppingcenter',
            component: shoppingcenter,
            children: [{
                    path: '/',
                    name: 'cart',
                    // component: () => import( /* webpackChunkName:"cart" */ './components/Home/cart/cart.vue'),
                    component: cart
                },
                {
                    path: 'items',
                    name: 'items',
                    // component: () => import( /* webpackChunkName:"items" */ './components/Home/cart/items.vue')
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