<template>
    <div id="items">
<!-- 問題區 無法選取電影類型，因為四個綁定一個屬性，搜尋bar大寫無法搜尋，小寫可以搜尋到大的，反過來不行
空白不行 - 也不行，少做一個，按照順序排名的BAR要且要略過冠詞
-->
        
        <div class="container-fluid bg-light">
            <!-- <button @click="getsomething">cartData</button> -->
            <router-view  />
            <router-link to="/shoppingcenter/cart">
                <div class="add-to-cart" @click="addItemsToCart">
                    <img src="https://ericchang159.github.io/Vue-Ecommerce/src/image/header-shopping-carticon.png">
                    <button class="btn btn-outline-primary" type="button">Add to cart</button>
                </div>
            </router-link>
            
            <div class="row ">
                <div class="col-md-12">
                    <ul class="nav nav-tabs mt-2 mb-3 ">
                    <li class="nav-item">
                      <a class="nav-link " :class= "{active : tabType == 'popularity'}" href="#" @click="dataTypeTab('popularity')">Popularity</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#" :class ="{active :tabType == 'vote_average'}" @click="dataTypeTab('vote_average')">Rating Average</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link " href="#":class ="{active :tabType == 'vote_count'}" @click="dataTypeTab('vote_count')">Vote count</a>
                    </li>
                    <li class="nav-item mr-auto">
                      <a class="nav-link disabled" href="#"></a>
                    </li>
                   
                    <li>
                         <form class="form-inline   ml-auto mr-auto">
                            <input v-model="keyWord" type="text" placeholder="Search" class="form-control ml-2 mr-2" aria-label="search">
                         </form> 
                    </li>
                  </ul>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 bg-light">
                        <button class="btn btn-outline-success mr-2" @click="selectedAll(1)">Select All</button>
                        <button class="btn btn-outline-success" @click="selectedAll(-1)">Cancel All</button>
                </div>
            </div>
            <div class="row bg-light">

                <div class="col-xl-4" v-for="(items,index) in keyWordSearch" 
                v-show ="index < dataLimit"
                :key="index" >

                    <div class="product-box">
                        <div class="img-icon">

                            <img class="not-selected" 
                            :src="imagePath + items.poster_path" 
                            :alt="items.isPhotoSelected"
                            :class="[items.isPhotoSelected? 'selected':'']"
                            @click="beSelected(items)">
                            
                        <div class="show-type">

                            <div v-for="(type,index) in types" :key="index">
                                <span class="not-choose" :class="[items.activeTypes && items.activeTypes.includes(type)? 'ischoose':'']" @click="chooseShowType(items, type)">{{type}}</a></span>
                            </div>

                        </div>
                        </div>


                        <ul class="product-inf">
                            <li v-html="items.title"></li>
                            <li>Release date:</li>
                            <li v-html="items.release_date"></li>
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
                
            </div>
            <div class="row">
                <div class="col-12 bg-light btn-showmore">
                    <button class="btn btn-outline-primary show-more-data" @click="showMore(-1)">Hide</button>
                    <button class="btn btn-outline-primary show-more-data" @click="showMore(1)">Show More</button>
                </div>
            </div>
            
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                types: ['2D', '3D', 'IMAX'],
                update:false,
                moviePage1: '',
                moviePage2: '',
                movieRank1: [],
                movieRank2: '',
                imagePath: 'https://image.tmdb.org/t/p/w500',
                quantity: 0,
                selected: false,
                chooseData:[],
                tabType:'popularity',
                keyWord:'',
                dataLimit:'9',
                cartDataId:[],
                // cartIcon:require('../../../image/header-shopping-carticon.png'),
                websiteAddress:location.href
                // cloneMovieRank1:'',
            }
        },
        props:[
            'cartData' 
        ],
        computed: {
            test(){
                console.log()
            },
            keyWordSearch(){
                 var  tempMovieRank1 = JSON.parse(JSON.stringify(this.movieRank1))
                  return  tempMovieRank1.filter(a=>{
                    var tags = ['title', 'release_date']
                    var flag = false
                    tags.forEach(tag=>{
                        //這邊的toLowerCase可以看成放寬條件，大小寫小都給過，因為全部都換成小寫了，
                        //之後再this.keyWord就把大寫又拉回來了
                        //new RegExp中的i係數為忽略大小寫選取   !==" "中間要空白
                        var x = a[tag]
                        if(this.update || a[tag].toLowerCase().indexOf(this.keyWord)!= -1 && this.keyWord !== ' '){
                        var matchWord = a[tag].match(new RegExp(this.keyWord,'i'))
                        var lowerKeyWord = new RegExp(this.keyWord,'i')
                         a[tag] = a[tag].replace(lowerKeyWord,`<span class= highLight>${matchWord}</span>`)
                            return flag = true
                        }
                    })
                        return flag
                })              
            },
            

        },
        methods: {
            getsomething(){
                // console.log(this.cartData)
                console.log(this.websiteAddress)
            },
            showMore(way){
               if(way>0){
                this.dataLimit = this.dataLimit+9
               }else{
                this.dataLimit = 9
               }
               
            },
            chooseShowType(items, type) {
                const id = items.id;
                const itemIndex = this.movieRank1.findIndex(a => a.id === id);
                const newMovieRank1 = this.movieRank1.slice();
                const movieItem = newMovieRank1[itemIndex];
                
                if (!movieItem.activeTypes) {
                    movieItem.activeTypes = [type];
                }else{
                    movieItem.activeTypes = []
                    movieItem.activeTypes.push(type);
                }
                
                if(movieItem.activeTypes != undefined && movieItem.quantity == undefined){
                    movieItem.isPhotoSelected = true
                    movieItem.quantity = 1
                }
                this.movieRank1 = newMovieRank1;
                console.log(movieItem.activeTypes)
                console.log(movieItem.activeTypes.includes(type))

            },
           clickme(items){  
            //    console.log(this.keyWordSearch)
               console.log(items)
           },
            beSelected(items) {
    
               const id = items.id
               const newMovieRank1 = this.movieRank1.slice()
               const itemIndex = this.movieRank1.findIndex(a => a.id === id)
               const movieItem = newMovieRank1[itemIndex]
               
               if(!movieItem.isPhotoSelected){
                movieItem.isPhotoSelected = true
                movieItem.activeTypes = ["2D"]
                movieItem.quantity = 1
               }else{
                movieItem.isPhotoSelected = !movieItem.isPhotoSelected
               }

               if(movieItem.isPhotoSelected == false){
                movieItem.activeTypes = undefined
                movieItem.quantity = undefined
               }
               this.movieRank1 = newMovieRank1
            },
            changeQuantity(items,way){
                // 用set方法插入，
                const id = items.id
                const newMovieRank1 = this.movieRank1.slice()
                const itemIndex = newMovieRank1.findIndex(a => a.id === id)
                const movieItem = newMovieRank1[itemIndex]

                if(typeof (movieItem.quantity) == 'undefined' ){
                    this.$set(movieItem,'quantity', 0)
                }
                way < 0 ? movieItem.quantity-- : movieItem.quantity++
                if (movieItem.quantity <= 0){
                    movieItem.quantity = undefined
                    movieItem.isPhotoSelected = false
                    movieItem.activeTypes = undefined

                }else if(movieItem.quantity != undefined && movieItem.activeTypes == undefined) {
                    movieItem.isPhotoSelected = true
                    movieItem.activeTypes = ["2D"]
                }
                console.log(movieItem.activeTypes)
                
                this.movieRank1 = newMovieRank1
            },
            selectedAll(way){
                const newMovieRank1 = this.movieRank1.slice()
                newMovieRank1.forEach(a=>{
                    if(typeof a.isPhotoSelected == undefined){
                    this.$set(a,'isPhotoSelected','false')
                    a.isPhotoSelected = false
                    }
                    way>0 ? a.isPhotoSelected = true  : a.isPhotoSelected = false
                   if(way>0){
                        if(a.activeTypes != undefined){
                            return;
                        }else if(a.activeTypes == undefined){
                            a.activeTypes = ['2D']
                        }
                   }else{
                       a.activeTypes = undefined
                   }
                    

                    if(a.isPhotoSelected == true && a.quantity == undefined ){
                        a.quantity = 1
                    }else if(a.isPhotoSelected == false){
                        a.quantity = undefined
                    }
                    
                })
                this.movieRank1 = newMovieRank1
            },
            addItemsToCart(){
                var cartDataId = []
                this.movieRank1.forEach(a => {
                    if (a.isPhotoSelected == true && this.cartData == '') {
                        this.chooseData.push(a)
                        console.log(1)
                    }else if(a.isPhotoSelected == true &&  this.cartDataId.includes(a.id) == false ){              
                        this.cartData.push(a)
                        this.chooseData = this.cartData
                        console.log(2)
                    }else if(a.isPhotoSelected == true &&  this.cartDataId.includes(a.id) == true){
                       var cartItemIndex = this.cartData.findIndex(b=>{
                            return b.id == a.id
                       })
                       var movieItemIndex = this.movieRank1.findIndex(c=>{
                            return c.id == a.id
                       })
                       console.log(cartItemIndex,'cartItemIndex')
                       console.log(movieItemIndex,'movieItemIndex')
                       this.cartData[cartItemIndex] = this.movieRank1[movieItemIndex]
                       return this.chooseData = this.cartData
                    }else if(this.cartData == ''){
                        return;
                    }else{
                        console.log(4)
                        return this.chooseData = this.cartData
                    }
                    
                   
                    return this.chooseData
                })    

                this.$emit('sendData',this.chooseData)
                // console.log(this.chooseData,'data from items')                

             },
             dataTypeTab(dataType){
                if(dataType == 'vote_average'){
                    this.movieRank1 = this.movieRank1.sort((a,b)=>{
                        this.tabType = 'vote_average'
                        return b.vote_average-a.vote_average 
                    })
                }else if(dataType == 'vote_count'){
                    this.movieRank1 = this.movieRank1.sort((a,b)=>{
                        this.tabType = 'vote_count'
                        return b.vote_count - a.vote_count
                    })

                }else if(dataType == 'popularity'){
                    this.movieRank1 = this.movieRank1.sort((a,b) =>{
                        this.tabType = 'popularity'
                        return b.popularity - a.popularity
                    })
                    
                }
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
                    if(this.cartData != ''){
                        this.cartData.map(b=>{
                        this.cartDataId.push(b.id)
                        return this.cartDataId
                    })
                    }
                    
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