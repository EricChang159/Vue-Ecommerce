methods: {
    filteData(movieData , after){
            this.after = this.movieData.results.slice(0).sort((a,b) => {
            b.popularity - a.popularity
        }).map(a => a.title).join('')
    }  
},
mounted() {
    window.vue =this
    this.axios.get('https://api.themoviedb.org/3/discover/movie?api_key=192102bc85d3156ffe17c011468b1fb5&include_adult=ture&include_video=ture')
    .then(datas => {
            this.movieData = datas.data
            this.movieRank = this.movieData.results.sort((a,b)=> {
                b.popularity - a.popularity
            }).map(a => a.title).join('')
    })

    this.axios.get('https://api.themoviedb.org/3/discover/movie?api_key=192102bc85d3156ffe17c011468b1fb5&include_adult=ture&include_video=ture')
    .then(datas => {
        this.dataData = datas.data
        this.filteData(this.dataData,this.movieRank)
    })