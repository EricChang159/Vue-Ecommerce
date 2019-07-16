<template>
    <div id="app">
            <!-- <HeaderBar></HeaderBar> -->
            <div class="container-collapse">
                <router-link to = '/' >to head</router-link>
                <router-link to = '/shoppingcenter/items' >to shoppingcenter/items</router-link>
                <router-link to = '/shoppingcenter/cart' >to shopping/cart</router-link>
                <router-link to = '/shoppingcenter' >to shopping</router-link>
            </div>
                <br>
           
            <router-view :movies ='movieRank1' />


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
            choose:[],
            movieRank1:[],
        }
    },
    metaInfo:{
        meta:[{
            name: "viewport",
            content: 'width=device-width, initial-scale=1'
        }]

    },
    mounted() {
        this.axios.get(
                'https://api.themoviedb.org/3/discover/movie?api_key=192102bc85d3156ffe17c011468b1fb5&include_adult=ture&include_video=ture'
            )
                .then(datas => {
                    var vm = this
                    vm.moviePage1 = datas.data
                    vm.movieRank1 = vm.moviePage1.results.slice(0, 20).sort((a, b) => {
                        b.popularity - a.popularity
                    })
                })
    },
   
}
</script>
<style lang="css">
#app{
    z-index: -10;
    height:520px;
}

</style>