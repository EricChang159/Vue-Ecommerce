<template>
    <div id="cart">
        <router-view />
        <div class="container-fluid">
                <div class="row bg-light">
                        <div class="col-md-12 no-items" v-show="datafromFather.length < 1" >there is no item in your cart</div>
                    </div>
        <div class="row bg-light " v-for="(items,index) in datafromFather" :key="index" >
               
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

                                <span class="not-choose" :class="[items.isChooseShowType? 'ischoose':'']" >3D</a></span>
                                <span class="not-choose" :class="[items.isChooseShowType? 'ischoose':'']" >4D</span>
                                <span class="not-choose" :class="[items.isChooseShowType? 'ischoose':'']" >IMAX</span>
                                <span class="not-choose" :class="[items.isChooseShowType? 'ischoose':'']" >GC</span>

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
                            <div>
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
            }
        },
        props:[
            'datafromFather'
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
            },
            cancelSelected(index){
                this.datafromFather.splice(index,1)
            
            }
          
        },
        mounted() {
            window.vue = this
        
            
        }

                
            
         
    
}
</script>