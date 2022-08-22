const watchlistMain = document.getElementById("watchlist-main")

let movieObjects = localStorage.getItem("movies")

if (movieObjects) {
    movieObjects = JSON.parse(movieObjects)

}





function renderWatchlist () {
    if (!movieObjects || movieObjects.length === 0) {
        watchlistMain.innerHTML = `<div class="flex">
                                        <p class="watchlist-message">Your watchlist is looking a little empty...</p>
                                        <a href="index.html" class="watchlist-link-to-search">
                                        
                                                <img src="images/plus.png" class="watchlist-message-icon"/>
                                                <p class="watchlist-add-message">Let's add some movies!</p>
                                         
                                        </a>
                                    </div>`
    } else {
      
        watchlistMain.innerHTML = ""
        for (let movie of movieObjects) {
       
      
        
        let newSection = document.createElement("section")
        newSection.classList.add("movie")
    
        newSection.innerHTML = `<div class="poster-holder">
                                    <img src=${movie.Poster} class="movie-poster" />
                                </div>
                                <div class="movie-info-holder">
                                    <div class="movie-title-and-rating">
                                        <h2 class="movie-title">${movie.Title}</h2>
                                        <img src="images/star.png" class="movie-star-icon"/>
                                        <p class="movie-rating">${movie.Ratings[0].Value.substring(0,    3)}</p>
                                    </div>
                                    <div class="movie-length-genre-and-watchlist">
                                        <p class="movie-length">${movie.Runtime}</p>
                                        <p class="movie-genre">${movie.Genre}</p>
                                        <button class="movie-remove-from-watchlist-button">
                                            <img src="images/minus.png"          class="movie-remove-from-watchlist-icon" onclick="removeMovieFromWatchlist(this)" data-id="${movie.imdbID}"/>
                                            <p class="movie-remove-from-watchlist-text">Watchlist</p>
                                        </button>
                                    </div>
                                    <p class="movie-description">${movie.Plot}</p> 
                                    </div>`
        watchlistMain.appendChild(newSection)
        }
    }
   
}

function removeMovieFromWatchlist(self) {

    for (let i = 0; i < movieObjects.length; i++) {
        if (movieObjects[i].imdbID === self.dataset.id) {
            movieObjects.splice(i, 1)
        }
    }
    localStorage.setItem("movies", JSON.stringify(movieObjects))
    renderWatchlist()
}

renderWatchlist()

