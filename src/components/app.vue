<template>
    <div id="app" class="container-collapse">
        <navbar></navbar>
        <router-view :movies ='movieRank1' />
        <!-- <test></test> -->


    </div>
</template>
<script>
import navbar from './Home/header/navbar.vue'
import test from './Home/bottomDown.vue'
export default {
    name:"app",
    components:{
        navbar,
        test,

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