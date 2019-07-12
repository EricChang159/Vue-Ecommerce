<template>
    <div id="shoppingcenter">
            <!-- {{choose}} -->
         
        <router-view @sendData='getData' :datafromFather="choose"/>
        <!-- <button class="btn btn-outline-primary" @click="getData">getData</button> -->

    </div>
</template>
<script>
export default {
    data(){
        return{
            choose:'', 
        }
    },
    methods:{ 
         getData(data){
        this.choose = data
        console.log(this.choose)
        }
   
    }
}
</script>