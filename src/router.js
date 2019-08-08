import Vue from 'vue'
import Router from 'vue-router'
import carousel from './components/Home/header/carousel.vue'
import shoppingcenter from './components/Home/cart/shoppingcenter.vue'
// import items from './components/Home/cart/items.vue'
// import cart from './components/Home/cart/cart.vue'
Vue.use(Router)

export default new Router({
    mode: 'hash',
    // linkActiveClass: "active",
    routes: [{
            path: '/',
            name: 'carousel',
            component: carousel,
        },
        {
            path: '/shoppingcenter',
            name: 'shoppingcenter',
            component: shoppingcenter,
            children: [{
                    path: 'cart',
                    name: 'cart',
                    component: () => import(  './components/Home/cart/cart.vue'),
                },
                {
                    path: 'items',
                    name: 'items',
                    component: () => import('./components/Home/cart/items.vue')
                    // component: items
                }
            ]
        },
    ]
})