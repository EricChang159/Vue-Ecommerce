<template>
    <div id="app">
            <!-- <HeaderBar></HeaderBar> -->
            <router-link to = '/' >to head</router-link>
            <br>
            <router-link to = '/shoppingcenter/items' >to shoppingcenter/items</router-link>
            <br>
            <router-link to = '/shoppingcenter/cart' >to shopping/cart</router-link>
            <router-link to = '/shoppingcenter' >to shopping</router-link>
            <router-view />

    </div>
</template>

<script>
import HeaderBar from './Home/header/header-fixbar.vue'

export default {
    name:"app",
    components:{
        HeaderBar,
    },
    data(){
        return {
        }
    },
    metaInfo:{
        meta:[{
            name: "viewport",
            content: ''
        }]

    },
   
}
</script>
<style lang="css">
#app{
    z-index: -10;
}

</style>