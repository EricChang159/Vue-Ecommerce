<template>
    <div id="cart">
        <router-view />
        <div class="row bg-light">

                <div class="col-xl-4" v-for="(items,index) in datafromFather" :key="index" v-show="index < 21">
                    <div class="product-box">
                        <div class="img-icon">

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
                            <li>Release date:</li>
                            <li>{{items.release_date}}</li>
                            <!-- <li>Runtime:</li> -->
                            <!-- <li>Genres:</li> -->
                            <li>vote_average</li>
                            <li>#####</li>
                            <div>
                                <button @click="changeQuantity(items,1)">+</button>
                                <input type="text" v-model="items.quantity" placeholder="1">
                                <button @click="changeQuantity(items,-1)">-</button>

                            </div>

                        </ul>

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
          
        },
        mounted() {
            window.vue = this
        
            
        }

                
            
         
    
}
</script>