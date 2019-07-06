import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './components/app.vue'
import './styles/reset.css'
import './styles/css/bootstraps/bootstrap.css'
import './styles/css/header.scss'

Vue.use(VueMeta)
var root = document.createElement('div')
document.body.appendChild(root)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    // component:


}).$mount(root)