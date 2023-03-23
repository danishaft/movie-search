
const searchInput = document.getElementById('search-input')
const movieContainer = document.getElementById('main-movie-container')
const searchForm = document.getElementById('search-form')


 /*async function getSearchResults(e){
    e.preventDefault()
    let inputVal = searchInput.value
    inputVal? inputVal = inputVal.split(' ').join('+'): ''
    if(inputVal){
       await fetch(`http://www.omdbapi.com/?apikey=7e48dbcf&s=${inputVal}`)
        .then(res => res.json())
        .then((data)=>{
            if(data.Response === "True"){
                searchArr = data.Search
                //getMovieDetails(searchArr)
            }else{
                console.log('search some thing else')
            }
        })
    }
    searchForm.reset()
}
 function getMovieDetails (arr){
    let movieArr = []
     arr.map((obj)=>{
     fetch(`http://www.omdbapi.com/?apikey=7e48dbcf&i=${obj.imdbID}`)
     .then(res => res.json())
     .then((data)=> {
        movieArr.push(data)
     })
   })
   return movieArr
}*/

/*function getSearchResults(e){
    e.preventDefault()
    handleSearch()
    searchForm.reset()
}

async function handleSearch(){
    let inputVal = searchInput.value
    inputVal? inputVal = inputVal.split(' ').join('+'): ''
    if(inputVal){
        await fetch(`http://www.omdbapi.com/?apikey=7e48dbcf&s=${inputVal}`)
        .then(res => res.json())
        .then((data)=>{
            if(data.Response === "True"){
                searchArr = data.Search
                getMovieDetails()
            }else{
                console.log('search some thing else')
            }
        })
    }
}
 async function getMovieDetails (){
    await searchArr.map((obj)=>{
     fetch(`http://www.omdbapi.com/?apikey=7e48dbcf&i=${obj.imdbID}`)
     .then(res => res.json())
     .then((data)=> {
        movieArr.push(data)
     })
   })
   renderHtml()
}

function renderHtml(){

    const html = movieArr.map((obj)=>{
        return `
        <article class="movie w-full flex justify-between py-4 sm:py-6">
            <div class="left">
                <img src="${obj.Poster}" alt="" class="w-full h-full" >
            </div>
            <div class="right flex-col py-2 flex-wrap content-between">
                <div class="title flex align-middle">
                    <h3 class="pr-2 lg:pr-4">${obj.Title}</h3>
                    <span class="rating smaller-text flex items-center"><i class="fa-solid fa-star pr-1"></i><p>${obj.imdbRating}</p></span>
                </div>
                <div class="details flex smaller-text">
                    <p>${obj.Runtime}</p>
                    <p class="px-1 sm:px-2 md:px-3 lg:px-10 genres">${obj.Genre}</p>
                    <a href="#" class="flex items-center"><i class="fa-solid fa-circle-plus pr-1"></i><p>Watchlist</p></a>
                </div>
                <p class="description">
                    ${obj.Plot}
                </p>
            </div>
        </article>`
    }).join('')
    movieContainer.innerHTML = html
}*/


document.addEventListener('click', e => {
    if(e.target.dataset.add){
        handleWishList(e.target)
    }
})

//simple solution

async function fetchData(name) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=7e48dbcf&s=${name}`);
    const data = await res.json();
    return data;
}
let arr ;
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = await fetchData(searchInput.value);
    // Map over the data array here
    const promises = data.Search.map((country) =>
        fetch(`http://www.omdbapi.com/?apikey=7e48dbcf&i=${country.imdbID}`)
            .then((res) => res.json())
    );

    arr = await Promise.all(promises);

    const final = arr.map((obj)=>{
        return `
        <article class="movie w-full flex justify-between py-4 sm:py-6">
            <div class="left">
                <img src="${obj.Poster}" alt="" class="w-full h-full" >
            </div>
            <div class="right flex-col py-2 flex-wrap content-between">
                <div class="title flex align-middle">
                    <h3 class="pr-2 lg:pr-4">${obj.Title}</h3>
                    <span class="rating smaller-text flex items-center"><i class="fa-solid fa-star pr-1"></i><p>${obj.imdbRating}</p></span>
                </div>
                <div class="details flex smaller-text">
                    <p>${obj.Runtime}</p>
                    <p class="px-1 sm:px-2 md:px-3 lg:px-10 genres">${obj.Genre}</p>
                    <span class="flex items-center"><i class="fa-solid fa-circle-plus pr-1 cursor-pointer" data-add="${obj.imdbID}" ></i><p>Watchlist</p></span>
                </div>
                <p class="description">
                    ${obj.Plot}
                </p>
            </div>
        </article>`
    })
    searchInput.value=''
   movieContainer.innerHTML = final.join('')

});

let wishListArr = []

function handleWishList(id){
    const targetMovie = arr.filter(obj=>{
        return obj.imdbID === id.dataset.add
    })
    if(id.classList.contains('fa-circle-plus')){
        wishListArr.push(targetMovie[0])
        id.classList.remove('fa-circle-plus')
        id.classList.add('fa-circle-minus')
    }else{
        wishListArr.splice(wishListArr.indexOf(targetMovie[0]),1)
        id.classList.remove('fa-circle-minus')
        id.classList.add('fa-circle-plus')
    }
    localStorage.setItem('wishlist', JSON.stringify(wishListArr))
}