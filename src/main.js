import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './components/app.vue'
import router from './router'
import Axios from 'axios'
import VueAxios from 'vue-axios'

import './styles/reset.css'
import './styles/css/bootstraps/bootstrap.css'
import './styles/css/header.scss'
import './styles/css/header-css/menu.scss'
import './styles/css/cart.scss'

Vue.use(VueAxios, Axios)
Vue.use(VueMeta)
var root = document.createElement('div')
document.body.appendChild(root)

Vue.config.productionTip = false

new Vue({
    router: router,
    render: h => h(App),

}).$mount(root)