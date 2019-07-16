import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    linkActiveClass: "active",
    routes: [
        {
        path: '/',
        name: 'carousel',
        component: () => import('./components/Home/header/carousel.vue')
        },
        {
            path: '/',
            name: 'header',
            component: () => import('./components/Home/header/header.vue')
        },
        {
            path: '/shoppingcenter',
            name: 'shoppingcenter',
            component: () => import('./components/Home/cart/shoppingcenter.vue'),
            children: [{
                    path: 'cart',
                    name: 'cart',
                    component: () => import('./components/Home/cart/cart.vue'),

                },
                {
                    path: 'items',
                    name: 'items',
                    component: () => import('./components/Home/cart/items.vue'),
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