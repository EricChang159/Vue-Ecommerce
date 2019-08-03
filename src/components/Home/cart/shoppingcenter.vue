<template>
    <div id="shoppingcenter">
            <!-- {{choose}} -->
         
        <router-view @sendData='getData' :datafromFather="choose" :movieData="movies" />
        <!-- <button class="btn btn-outline-primary" @click="getData">getData</button> -->
    </div>
</template>
<script>
export default {
    data(){
        return{
            choose:'', 
            movieDataBase:[],
        }
    },
    props:['movies'],
    methods:{ 
         getData(data){
        this.choose = data
        },
   
    },
    mounted() {
        window.vue=this
    },
}
</script>