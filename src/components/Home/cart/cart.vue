<template>
    <div id="cart">
        <router-view />
        <div class="container-fluid">
                <div class="row bg-light no-items" v-show="datafromFather.length < 1" >
                        <div class="col-md-12 " >there is no item in your cart</div>
                        <router-link to="/shoppingcenter/items">
                            <div>Get Some Of Your Favorite Movie</div>
                            <img v-for="(poster,index) in randomPoster"  
                                    :key="index"
                            :src="imagePath + poster" >
                            
                        </router-link>                        
                    </div>
        <div class="row bg-light " v-for="(items,index) in newDatafromFather" :key="index" >
               
                <div class="col-md-6" >
                    <div class="product-box">
                        <div class="img-icon">
                            <div class="cancel-selected" @click='cancelSelected(index)'>X</div>
                            <img class="not-selected" 
                            :src="imagePath + items.poster_path" 
                            alt="product-photo"
                            :class="[items.isPhotoSelected? 'selected':'']"
                            >

                            <div class="show-type">

                                <div v-for="(type,index) in types" :key="index">
                                    <span class="not-choose" :class="[items.activeTypes && items.activeTypes.includes(type)? 'ischoose':'']" @click="chooseShowType(items, type)">{{type}}</a></span>
                                </div>
    
                            </div>
                        </div>


                        <ul class="product-inf">
                            <li>{{items.title}}</li>
                            <li>Release date :</li>
                            <li>{{items.release_date}}</li>
                            <!-- <li>Runtime:</li> -->
                            <!-- <li>Genres:</li> -->
                            <li>vote_average : {{items.vote_average}}</li>
                            <span class="ratings">
                            <li class="empty-stars"></li>
                            <li class="full-stars" :style="{width:items.vote_average/10*100+'%'}"></li>
                            </span>
                            <div class="cart-quantity">
                                <button class="btn btn-success mr-2" @click="changeQuantity(items,1)">+</button>
                                <input class="form-control col-3 align-items-center" type="text" v-model="items.quantity" readonly>
                                <button class="btn btn-success ml-2" @click="changeQuantity(items,-1)">-</button>


                            </div>

                        </ul>

                    </div>
                </div>
                <div class="col-md-6 product-story">
                     <p><b style="font-size:20px;">story : </b> {{items.overview}} </p>
                </div>
                
        </div>
    </div>
</div>
</template>
<script>
export default {
        data(){
            return{
                imagePath: 'https://image.tmdb.org/t/p/w500',
                quantity: 0,
                selected: false,
                types: ['2D', '3D', 'IMAX'],
                newDatafromFather:'',
                
            }
        },
        props:[
            'datafromFather',
            'movieData',
        ],
        methods:{
            changeQuantity(items,way){
                if(typeof (items.quantity) == 'undefined' ){
                    this.$set(items,'quantity', 0)
                }
                way < 0 ? items.quantity-- : items.quantity++
                if (items.quantity < 1){
                    items.quantity = 1
                }
                // console.log(this.newDatafromFather)
            },
            cancelSelected(index){
                this.newDatafromFather.splice(index,1)
            
            },
            chooseShowType(items, type) {
                const id = items.id;
                const itemIndex = this.newDatafromFather.findIndex(a => a.id === id);
                const newMovieRank1 = this.datafromFather.slice();
                const newItems = newMovieRank1[itemIndex];

                // if (!newMovieRank1[itemIndex].activeTypes) {
                    this.$set(newItems,'activeTypes',[type])
                    
                // }else{
                //     newMovieRank1[itemIndex].activeTypes = []
                //     this.$set(newMovieRank1[itemIndex],'activeTypes',[type])
                //     console.log('1')
                //     // newMovieRank1[itemIndex].activeTypes.push(type);
                    
                // }
                this.newDatafromFather = newMovieRank1;
            },
            
            
          
        },
        computed: {
            randomPoster(){
                var posterPath = []
                let i;
                var newMovieData = this.movieData.slice()
                for(i=0;i<3;i++){
                    var movieIndex = Math.floor(Math.random()*newMovieData.length)
                    
                    posterPath.push(newMovieData[movieIndex].poster_path)
                    newMovieData.splice(movieIndex,1) 
                    
                }
                newMovieData = this.movieData
                return posterPath                
            }

        },
        mounted() {
            // window.vue = this
            this.newDatafromFather = this.datafromFather
            console.log(this.movieData)
        
            
        }

                
            
         
    
}
</script>