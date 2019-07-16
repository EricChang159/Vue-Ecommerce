<template>
    <div id="items">
<!-- 問題區 無法選取電影類型，因為四個綁定一個屬性，搜尋bar大寫無法搜尋，小寫可以搜尋到大的，反過來不行
空白不行 - 也不行，少做一個，按照順序排名的BAR要且要略過冠詞
-->
        
        <div class="container-fluid">
            
            <router-view  />
            <router-link to="/shoppingcenter/cart">
                <div class="add-to-cart" @click="addItemsToCart">
                    <img src="../../../image/header-shopping-carticon.jpg">
                    <button class="btn btn-outline-primary" type="button">Add to cart</button>
                </div>
            </router-link>
            
            <div class="row bg-light">
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
                            <!-- <button @click.prevent="clickme" type="submit" class="btn btn-outline-success ">Search</button> -->
                         </form> 
                    </li>
                  </ul>
                  <div>{{keyWord}}</div>
                </div>
                

            </div>
            <div class="row">
                <div class="col-lg-12">
                        <button class="btn btn-outline-success mr-2" @click="selectedAll(1)">Select All</button>
                        <button class="btn btn-outline-success" @click="selectedAll(-1)">Cancel All</button>
                </div>
            </div>
            <div class="row bg-light">

                <div class="col-xl-4" v-for="(items,index) in keyWordSearch" 
                :key="index" >
                        <button @click.prevent="clickme" type="submit" class="btn btn-outline-success ">Search</button>

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
                <div class="row">
                    <div class="col-12 bg-light justify-content-center btn-showmore">
                        <button class="btn btn-outline-primary ">SHOW MORE</button>
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
                movieRank1: [],
                movieRank2: '',
                imagePath: 'https://image.tmdb.org/t/p/w500',
                quantity: 0,
                selected: false,
                chooseData:[],
                tabType:'popularity',
                keyWord:'',
                cloneMovieRank1:'',
            }
        },
        computed: {
            
            keyWordSearch(){
                this.cloneMovieRank1 = JSON.parse(JSON.stringify(this.movieRank1))
                this.cloneMovieRank1.filter(a=>{
                    var tags = ['title', 'release_date']
                    var flag = false
                    tags.map(tag=>{
                        //這邊的toLowerCase可以看成放寬條件，大小寫小都給過，因為全部都換成小寫了，
                        //之後再this.keyWord就把大寫又拉回來了
                        //new RegExp中的i係數為忽略大小寫選取   !==" "中間要空白
                        var x = a[tag]
                        if(a[tag].toLowerCase().indexOf(this.keyWord)!= -1 && this.keyWord !== ' '){
                        var matchWord = a[tag].match(new RegExp(this.keyWord,'i'))
                        var lowerKeyWord = new RegExp(this.keyWord,'i')
                         a[tag] = a[tag].replace(lowerKeyWord,`<span class= highLight>${matchWord}</span>`)
                            return flag = true
                        }
                    })
                        return flag
                })
              return  this.movieRank1 = JSON.parse(JSON.stringify(this.cloneMovieRank1))
            }
        },
        methods: {
           clickme(items){
            //    console.log(this.keyWordSearch)
               console.log(items)
           },
            beSelected(items) {
               if(typeof items.isPhotoSelected == 'undefined'){
                   this.$set(items,'isPhotoSelected','false')
                   items.isPhotoSelected = false
               }
               items.isPhotoSelected = !items.isPhotoSelected 
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