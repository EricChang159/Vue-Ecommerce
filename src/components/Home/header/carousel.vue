<template>
<!-- <div class="container-collapse"> -->
    <!-- <div class="col-sm-12 carousel-box"> -->
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
          <!-- :count ="10" -->
              <slide  :index="index"  v-for="(items, index) in 10":key="index">
                  <img :src="imagePath + movieRank1[index].poster_path" >
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
            movieRank1:'',
        }
    },
    methods: {
        check(items,index){
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
                    console.log(this.movieRank1[0].poster_path)
                })
                
    },
    // updated(){
    //     isactive = true
    // }
}
</script>
<style>
   /* #carousel{
    height:600px;
    
   }
   
   img{
       border:black;
   } */

</style>