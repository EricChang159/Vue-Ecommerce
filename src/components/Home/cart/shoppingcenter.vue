<template>
    <div id="shoppingcenter">
            <!-- {{choose}} -->
         
        <router-view @sendData='getData' :datafromFather="choose" :movieData="movies" 
                    @dataBack='cartDataBack' :cartData="dataBackFromCart"
        />
        <!-- <button class="btn btn-outline-primary" @click="getData">getData</button> -->
        <!-- <button @click="checkData" style="position: absolute;">shoppingcenter check Data</button> -->
    </div>
</template>
<script>
export default {
    data(){
        return{
            choose:'', 
            movieDataBase:[],
            dataBackFromCart:"",
        }
    },
    props:['movies'],
    methods:{ 
        checkData(){
            console.log(this.movies)
        },
         getData(data){
        this.choose = data
        console.log(this.choose,'shoppingcenter get data from items')
        },
        cartDataBack(data){
            this.dataBackFromCart = data
            console.log(data,'shoppingcenter')
        },
        
    },
    mounted() {
        window.vue=this
    },
    computed: {
        
    },
}
</script>
<style>
    #shoppingcenter, #cart,#items,.items-page-background{
        background-color: #FFEC91 !important;
    }
    /* .nav-tabs-background,.selectedAll-btn-background{
        background-color:#F3FFBD !important;
    } */

</style>