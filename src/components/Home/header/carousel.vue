<template>
<div class="container-collapse">
    <div class="col-sm-12 carousel-box">
          <carousel-3d id="carousel"
          :autoplay='true'
          :autoplayTimeout='3500'
          :perspective='35'
          :display='5'
          :animationSpeed='2000'
          :height='480'
          :width='400'
          :border='10'
          :controlsVisible='true'
          :controlsHeight='100'
          :controlsWidth='100'
          :startIndex="0"
          >
              <slide  v-for="(items, index) in movieRank1" :index="index" :key="index">
                  <img :src="imagePath+items.poster_path">
              </slide>
          </carousel-3d>     
    </div>
</div>
</template>
<script>
// import {Carousel3D,Slide} from 'vue-carousel-3d'
export default {
    name:'carousel',
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
                    this.moviePage1 = datas.data
                    this.movieRank1 = this.moviePage1.results.slice(0, 5).sort((a, b) => {
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
   #carousel{
    /* background:orange; */
    height:600px;
    
   }
   
   img{
       border:black;
   }

</style>