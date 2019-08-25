<template>
    <div id="practice" class="container" >
        <div class="row">
            <div class="col-sm-12">
                <br>
                <lable>關鍵字</lable>
                <input type="text" v-model="filter">
            </div>
        </div>
        <div class="row">
            
            <div class ="content-box col-md-4" 
            v-for ="(items,index) in keyWordFilter" 
            :key="index"
            >   
                <div class="innerbox">
                <img :src="items.cover" :style="{backgroundImage: `url(${items.cover})`, 'backgroundSize': 'cover'}">
                <h6 v-html='items.name_short'></h6>
                <h4 v-html='items.title'></h4>
                <p v-html='items.description'></p>
                <!-- {{coverBackground}} -->
                <button @click="filter++">1223</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // icon 要呈現的地方，template是要呈現的內容
//  Vue.component('icon',{
//         template:'#practice'
// })
export default {
    data(){
        return{
           datas:[], 
           Background:'',
           filter:'夢想'
        }
    },
    mounted() {
        // window.vue = this
        var vm = this
        this.axios.get('http://awiclass.monoame.com/api/command.php?type=get&name=post')
        .then(res => {
            vm.datas = res.data
            vm.datas.forEach( a => {
                if(a.cover.indexOf('http') == -1){
                    a.cover = 'https://zashare.org'+ a.cover
                }
            })
        })

    },
    methods:{
        check(items){
        }
    },
    filter:{
        
          
      
    },
    computed:{ //此次範例，東西都放computed，啟動時機為mounted之後，高階一點的filter用途，因為也不是監聽觸發事件
        //所以放在這裡執行。
         coverBackground(){
            return {backgroundImage:
                `url('${items.map(a=>a.cover)}')`}

        },

        keyWordFilter(){
            return this.datas.map(a=>{
                var cloneA = JSON.parse(JSON.stringify(a));//deepclone 深度clone 連物件中的物件，也不會有傳址的現象發生，才不會更動到原先的資料。                
               cloneA.description = cloneA.description.substr(0,60);
                return cloneA
            })
            .filter(data=>{
                //利用indexOf進行資料塞選，在用replace取道選取資料，改為heightLight，換class，
                //接著在解決英文，大小寫判斷，換字判斷的部分。
                var tag = ['title', 'description','name_short']//foreach 有很多奇怪部分
                var flag = false
                tag.forEach((a)=>{
                    if(data[a].toLowerCase().indexOf(this.filter.toLowerCase()) !=-1){
                        flag = true;
                    }
                })
                    return flag;
            })
            .map(cloneA => {
                if(this.filter === '') return cloneA;
                var tag = ['title', 'description','name_short']
                tag.forEach((a)=>{
                    var matchWord = cloneA[a].match(new RegExp(this.filter,'i'))
                    cloneA[a] = cloneA[a].replace(
                       new RegExp(this.filter,'i'),
                        `<span class= heightLight>${matchWord}</span>`)
                }) 
                return cloneA;
            })
              
        }
        
    }
}
</script>

