<template>
    <div id="cart">
        <button @click="getInformation">123</button>
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
                    <a href="#" ><div class="item-list-show" @click.prevent="showList">Item List</div></a>
                    <div  class="check-items-listbox " :class="{ 'check-items-listbox-show' : flagShow }">  
                        <h4 style="text-align:center; color:brown">Item List</h4>
                        <h4 class="item-list-close" @click.prevent="showList">X</h4>
                        <div class="check-items-list " v-for="(list,index) in newDatafromFather" :key="index">
                            <ul>
                                <li>{{list.title}}</li>
                                <li>Type: {{list.activeTypes[0]}}</li>
                                <li>Quantity: {{list.quantity}}</li>
                                <li>Price: {{list.quantity*getPrice[index]}}</li>
                            </ul>
                        </div>
                        <div style="text-align:right; color:rgb(223, 69, 13);"><h4>{{getTotalMoney}}</h4></div>
                    </div>  
        <div class="row bg-light " v-for="(items,index) in newDatafromFather" :key="index" >
               
                <div class="col-lg-5 offset-lg-0 offset-sm-2  offset-0" >
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
                                <input style="width:100px;" class="form-control col-3 " type="text" v-model="items.quantity" readonly>
                                <button class="btn btn-success ml-2" @click="changeQuantity(items,-1)">-</button>


                            </div>

                        </ul>

                    </div>
                </div>
                <div class="col-lg-7 product-story">
                     <h4>{{items.title}}</h4>
                     <p> {{items.overview}} </p>
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
                singlePrice:[],
                flagShow:false,
            }
        },
        props:[
            'datafromFather',
            'movieData',
        ],
        methods:{
            getInformation(){
                console.log(typeof(''))
            },
            changeQuantity(items,way){
                const id = items.id;
                const itemIndex = this.newDatafromFather.findIndex(a => a.id === id);
                const newMovieData = this.datafromFather.slice();
                const newItems = newMovieData[itemIndex];
                if(typeof (newItems.quantity) == undefined ){
                    this.$set(items,'quantity', 0)
                }
                way < 0 ? newItems.quantity-- : newItems.quantity++
                if (newItems.quantity < 1){
                    newItems.quantity = 1
                }
                this.newDatafromFather = newMovieData
                
            },
            cancelSelected(index){
                this.newDatafromFather.splice(index,1)
                this.datafromFather = this.newDatafromFather
            
            },
            chooseShowType(items, type) {
                const id = items.id;
                const itemIndex = this.newDatafromFather.findIndex(a => a.id === id);
                const newMovieData = this.newDatafromFather.slice();
                const newItems = newMovieData[itemIndex];
                this.$set(newItems,'activeTypes',[type])
                this.newDatafromFather = newMovieData;
            },
            showList(){
                this.flagShow = !this.flagShow
               console.log(this.flagShow)
                return this.flagShow
                
            },
            // updatedfather() {
            //     this.$emit('dataBack',this.newDatafromFather)
            // },
        },
        computed: {
            checkData(){
                console.log(this.datafromFather,' cart get data from shoppingcenter')
                this.newDatafromFather = this.datafromFather
            },
            
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
            },
            getPrice(){
                // singlePrice 放入 data資料綁定反而無法即時更新computed 直接在式子中宣告singlePrice反而可以觸發computed屬性
                let price = 0;
                let singlePrice=[];
                if(this.newDatafromFather != ''){
                    this.newDatafromFather.forEach(a => {
                        switch(a.activeTypes[0]){
                                case '2D' : 
                                    price = 100;
                                    break;
                                case '3D' :
                                    price = 200;
                                    break;
                                case 'IMAX' :
                                    price = 300;
                                    break;
                            }
                        return  singlePrice.push(price)
                    })
                }
                
                return singlePrice
                    
            },
            getTotalMoney(){
                var sum = 0;
                if(this.newDatafromFather != ''){
                    this.newDatafromFather.forEach(a =>{
                        let price = 0;
                        switch(a.activeTypes[0]){
                            case '2D' : 
                                price = 100;
                                break;
                            case '3D' :
                                price = 200;
                                break;
                            case 'IMAX' :
                                price = 300;
                                break;
                        }
                        sum = sum + a.quantity*price
                        return sum
                    })
                }
                return sum+'$'
            }
            
        },
        mounted() {
            this.newDatafromFather = this.datafromFather
            console.log(this.newDatafromFather,'newDatafromFather')
            this.$emit('dataBack', this.newDatafromFather)
            
        },
        

                
            
         
    
}
</script>