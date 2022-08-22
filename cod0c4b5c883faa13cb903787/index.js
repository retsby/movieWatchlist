//check icon created by hqrloveq on flaticon.com 
//https://www.flaticon.com/free-icons/foursquare-check-in


const searchbar = document.getElementById("searchbar")
const searchButton = document.getElementById("search-btn")
const indexMain = document.getElementById("index-main")
const addToWatchlist = document.getElementById("add-to-watchlist")




async function getMovie (id) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=2e441b63&i=${id}`)
    const movie = await response.json()
    return movie    
}

function displayMovieInSearch (movieObj) {
    let newSection = document.createElement("section")
    newSection.classList.add("movie")
    newSection.innerHTML = `<div class="poster-holder">
                                <img src=${movieObj.Poster} class="movie-poster" />
                            </div>
                            <div class="movie-info-holder">
                                <div class="movie-title-and-rating">
                                    <h2 class="movie-title">${movieObj.Title}</h2>
                                    <img src="images/star.png" class="movie-star-icon"/>
                                    <p class="movie-rating">${movieObj.Ratings[0].Value.substring(0,    3)}</p>
                                </div>
                                <div class="movie-length-genre-and-watchlist">
                                    <p class="movie-length">${movieObj.Runtime}</p>
                                    <p class="movie-genre">${movieObj.Genre}</p>
                                    <button class="movie-add-to-watchlist-button">
                                        <img src="images/plus.png" class="movie-add-to-watchlist-icon" onclick="addMovieToWatchlist(this)" data-id="${movieObj.imdbID}" id="${movieObj.imdbID}"/>
                                        <p class="movie-add-to-watchlist-text" id=${movieObj.imdbID + "text"}>Watchlist</p>
                                    </button>
                                </div>
                                <p class="movie-description">${movieObj.Plot}</p> 
                            </div>`
    indexMain.appendChild(newSection)
    
}

function getListOfMovies (event) {
    indexMain.innerHTML = ""

    
    fetch(`https://www.omdbapi.com/?apikey=2e441b63&s=${searchbar.value}`)
        .then(res => res.json())
        .then(async data => {
            
            if (data.Response === "True") {
               
                for(let item of data.Search) {
                displayMovieInSearch(await getMovie(item.imdbID))
                }
                
            } else {
                indexMain.innerHTML = `<p class="search-fail-message">Unable to find what you’re looking for. Please try another search.</p>`
            }       
            
        })
}



let movieWatchlist = []

async function addMovieToWatchlist (self) {
    console.log(self)
    let id = self.dataset.id
    let img = document.getElementById(id)
    let description = document.getElementById(id).nextSibling
    console.log(img)
    const myMovie = await getMovie(id)
   
    if (localStorage.getItem("movies")) {
        movieWatchlist = JSON.parse(localStorage.getItem("movies"))
        if (!movieWatchlist.includes(myMovie)) {
            movieWatchlist.push(myMovie)
            localStorage.setItem("movies", JSON.stringify(movieWatchlist))
        }
    } else {
        movieWatchlist.push(myMovie)
        localStorage.setItem("movies", JSON.stringify(movieWatchlist))
        
    }
    img.src = "images/added.png"
    img.onclick = ""
    description.innerHTML = "Added"
}



searchButton.addEventListener("click", getListOfMovies)
