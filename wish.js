const wishCont = document.getElementById("main-wishlist")
const storedItem = JSON.parse(localStorage.getItem('wishlist'))
console.log(storedItem)

document.addEventListener('click', e => {
    if(e.target.dataset.remove){
        handleWishList(e.target)
    }
})
function handleWishList(id){
    const targetMovie = storedItem.filter(obj=>{
        return obj.imdbID === id.dataset.remove
    })
    if(id.classList.contains('fa-circle-minus')){
        storedItem.splice(storedItem.indexOf(targetMovie[0]),1)
        renderWishList()
    }
}

function renderWishList(){
   if(storedItem.length >= 0){
    const final = storedItem.map((obj)=>{
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
                    <span class="flex items-center"><i class="fa-solid fa-circle-minus pr-1 cursor-pointer" data-remove="${obj.imdbID}" ></i><p>Watchlist</p></span>
                </div>
                <p class="description">
                    ${obj.Plot}
                </p>
            </div>
        </article>`
    })
    wishCont.innerHTML = final.join("")
   }
}
renderWishList()