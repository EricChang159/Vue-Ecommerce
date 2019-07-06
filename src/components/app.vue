<template>
    <div id="app">
        <Header></Header>
     
    </div>
</template>

<script>
import Header from './Home/header.vue'

export default {
    name:"app",
    components:{
        Header,
    },
    data(){
        return {
        }
    },
    metaInfo:{
        head:"<meta name='viewport' content='width=device-width, initial-scale=1.0' />"
    }
    
}
</script>
<style lang="css">


</style>