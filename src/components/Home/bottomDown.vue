<template>
    <div id="test">
        
    </div>
</template>
<script>
export default {
    name:'test',
    data(){
        return{
            imagePath: 'https://image.tmdb.org/t/p/w500',
            movieRank1:[]
        }
    },
    mounted() {
        this.axios.get(
                'https://api.themoviedb.org/3/discover/movie?api_key=192102bc85d3156ffe17c011468b1fb5&include_adult=ture&include_video=ture'
            )
                .then(datas => {
                    var vm = this
                    var moviePage1 = datas.data
                    vm.movieRank1 = moviePage1.results.slice(0, 20).sort((a, b) => {
                        b.popularity - a.popularity
                    })
                })
    },
}
</script>