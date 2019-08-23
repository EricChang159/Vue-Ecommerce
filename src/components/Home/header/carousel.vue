<template>
<!-- <div class="container-collapse"> -->
    <!-- <div class="col-sm-12 carousel-box"> -->
          <carousel-3d id="carousel"
          :autoplay='true'
          :autoplayTimeout='3500'
          :perspective='35'
          :display='5'
          :animationSpeed='2000'
          :height='540'
          :width='400'
          :border='10'
          :controlsVisible='true'
          :controlsHeight='100'
          :controlsWidth='100'
          :startIndex="0"
          >
          <!-- :count ="10" -->
              
          <slide  :index="index"  v-for="(items, index) in 10":key="index">
                  <router-link to="/shoppingcenter/items">
                    <a href="#">
                        <img class="slide-img" :src="imagePath + moviePosterData[index]" >
                    </a>
                </router-link>
              </slide>
            
          </carousel-3d>     
    <!-- </div> -->
<!-- </div> -->
</template>
<script>
// import {Carousel3D,Slide} from 'vue-carousel-3d'
export default {
    name:'carousel',
    data(){
        return{
            imagePath: 'https://image.tmdb.org/t/p/w500',
            movieRank1:[],
            moviePoster:[],

        }
    },
    methods: {
        check(items,index){
        }
    },
    computed:{
        moviePosterData(){
            if(this.movieRank1 != ''){
                var posterPath = []
                this.moviePoster = this.movieRank1.slice()
                this.moviePoster.map(a=>{
                    posterPath.push(a.poster_path)
                })
                return posterPath
            }else{
               return  posterPath = []
            }
            
        }
    },

    
    // 
   
    mounted() {
            this.axios.get(
                'https://api.themoviedb.org/3/discover/movie?api_key=192102bc85d3156ffe17c011468b1fb5&include_adult=ture&include_video=ture'
            )
                .then(datas => {
                    const moviePage1 = datas.data
                    this.movieRank1 = moviePage1.results.sort((a,b)=>{
                        b.popularity - a.popularity
                    })

                })
                
    },
    // updated(){
    //     isactive = true
    // }
}
</script>
<style>



</style>