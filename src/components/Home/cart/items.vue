<template>
    <div id="items">

        
        <div class="container-fluid">
            <router-view  />
            <!-- <router-link to="items/cart"> -->
                <div class="add-to-cart" @click="addItemsToCart">
                    <img src="../../../image/header-shopping-carticon.png">
                    <button class="btn btn-outline-primary" type="button">Add to cart</button>
                </div>
            <!-- </router-link> -->

            <div class="row bg-light">
                <div class="col-lg-12">
                    <div>Popularity</div>
                    <div>Genres</div>
                    <div>Hor Now</div>

                <button class="btn btn-outline-success" @click="selectedAll(1)">Select All</button>
                <button class="btn btn-outline-success" @click="selectedAll(-1)">Cancel All</button>

                </div>
            </div>

            <div class="row bg-light">

                <div class="col-xl-4" v-for="(items,index) in movieRank1" :key="index" v-show="index < 21">
                    <div class="product-box">
                        <div class="img-icon">

                            <img class="not-selected" 
                            :src="imagePath + items.poster_path" 
                            alt="product-photo"
                            :class="[items.isPhotoSelected? 'selected':'']"
                            @click="beSelected(items)">

                            <div class="show-type">

                                <span class="not-choose" :class="[items.isChooseShowType? 'ischoose':'']" @click="chooseShowType(items)">3D</a></span>
                                <span class="not-choose" :class="[items.isChooseShowType? 'ischoose':'']" @click="chooseShowType(items)">4D</span>
                                <span class="not-choose" :class="[items.isChooseShowType? 'ischoose':'']" @click="chooseShowType(items)">IMAX</span>
                                <span class="not-choose" :class="[items.isChooseShowType? 'ischoose':'']" @click="chooseShowType(items)">GC</span>

                            </div>
                        </div>


                        <ul class="product-inf">
                            <li>{{items.title}}</li>
                            <li>Release date:</li>
                            <li>{{items.release_date}}</li>
                            <!-- <li>Runtime:</li> -->
                            <!-- <li>Genres:</li> -->
                            <li>vote_average</li>
                            <li>#####</li>
                            <div>
                                <button @click="changeQuantity(items,1)">+</button>
                                <input type="text" v-model="items.quantity">
                                <button @click="changeQuantity(items,-1)">-</button>

                            </div>

                        </ul>

                    </div>
                </div>

            </div>


        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                moviePage1: '',
                moviePage2: '',
                movieRank1: '',
                movieRank2: '',
                imagePath: 'https://image.tmdb.org/t/p/w500',
                quantity: 0,
                selected: false,
                chooseData:[],
            }
        },
        methods: {
            beSelected(items) {
               if(typeof items.isPhotoSelected == 'undefined'){
                   this.$set(items,'isPhotoSelected','false')
                   items.isPhotoSelected = false
               }
               items.isPhotoSelected = !items.isPhotoSelected 
            },
            // chooseShowType(items){
            //    if(typeof items.isChooseShowType == 'undefined'){
            //        this.$set(items,'isChooseShowType',"false")
            //        items.isChooseShowType = false
            //    }
            //        items.isChooseShowType = !items.isChooseShowType

            //    console.log(items.isChooseShowType)
            // },
            chooseShowType(items){
                // items.forEach(a => {
                //     if(typeof a.isChooseShowType == 'undefined'){
                //         this.$set(items,'isChooseShowType',true)
                //     }
                //     a.isChooseShowType = !a.isChooseShowType
                // })
                // items.isChooseShowType = !items.isChooseShowType
                // console.log(items.isChooseShowType)
                
                //     [{name,isChooseShowType}]
                // items.forEach(item=> {
                //     if(typeof item.isChooseShowType == 'undefined'){
                //         this.$set(item,'isChooseShowType',true)
                //     }
                //     item.isChooseShowType = !item.isChooseShowType
                //     console.log(item)
                // })
            },
            changeQuantity(items,way){
                if(typeof (items.quantity) == 'undefined' ){
                    this.$set(items,'quantity', 0)
                }
                way < 0 ? items.quantity-- : items.quantity++
                if (items.quantity < 1){
                    items.quantity = 1
                }
            },
            selectedAll(way){
                this.movieRank1.forEach(a=>{
                    if(typeof a.isPhotoSelected == 'undefined'){
                    this.$set(a,'isPhotoSelected','false')
                    a.isPhotoSelected = false
                    }
                    way>0 ? a.isPhotoSelected = true  : a.isPhotoSelected = false
                })
            },
            addItemsToCart(){
                
                this.movieRank1.forEach(a => {
                    if (a.isPhotoSelected == true) {
                    this.chooseData.push(a)
                     }
                })    
                this.$emit('sendData',this.chooseData)
             }
        },      
        mounted() {
            window.vue = this
            this.axios.get(
                'https://api.themoviedb.org/3/discover/movie?api_key=192102bc85d3156ffe17c011468b1fb5&include_adult=ture&include_video=ture'
            )
                .then(datas => {
                    this.moviePage1 = datas.data
                    this.movieRank1 = this.moviePage1.results.slice(0, 20).sort((a, b) => {
                        b.popularity - a.popularity
                    })
                    // .map(a => a.title).join('<br>')
                })
            // this.axios.get('https://api.themoviedb.org/3/discover/movie?api_key=192102bc85d3156ffe17c011468b1fb5&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=2')
            // .then(datas => {
            //     this.moviePage2 = datas.data
            //     this.movieRank2 = this.moviePage2.results.sort((a,b)=> {
            //         b.popularity - a.popularity
            //     }).map(a => a.title).join('')
            // })
        }      
    }


    /* // axios.defaults.baseURL = 'https://api.themoviedb.org'
axios.defaults.imgURL='https://image.tmdb.org/t/p/w500'
this.movieRank = this.movieData.filter(data => data.popularity.sort((a,b)=> {
    return b - a
})).map(movie => movie.name) */
</script>
<style>

</style>