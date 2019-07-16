<template>
    <div class="col-sm-12 carousel-box">
          <carousel-3d id="carousel"
          :autoplay='true'
          :autoplayTimeout='4000'
          :perspective='35'
          :display='5'
          :animationSpeed='3000'
          :height='480'
          :width='400'
          :border='10'
          :controlsVisible='true'
          :controlsHeight='100'
          :controlsWidth='100'
          >
              <slide :index="index" v-for="(items, index) in movies":key="index">
                  <img :src="imagePath + items.poster_path">
              </slide>
          </carousel-3d>     
    </div>
</template>
<script>
// import {Carousel3D,Slide} from 'vue-carousel-3d'
export default {
    name:'carousel',
    data(){
        return{
            imagePath: 'https://image.tmdb.org/t/p/w500',
        }
    },
    props:['movies'],
   
    mounted() {
        console.log(this.movies)
    },
}
</script>
<style>
   #carousel{
    /* background:orange; */
    height:600px;
    
   }
   .carousel-box{
    background:orange;
    height:560px;
    padding:10px 0 0 0;
    margin-top:80px;
   }
   img{
       border:black;
   }

</style>