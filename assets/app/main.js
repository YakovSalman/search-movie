const form = document.querySelector('.form');
const result = document.querySelector('.result');

const getResourse = async (value) => {
    const response = await fetch(`http://www.omdbapi.com/?s=${value}&apikey=c53c0720`)

    return await response.json();
}

const getResourse2 = async (id) => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=c53c0720&i=${id}`)

    return await response.json();
}

let movieInfo = {
    name: '',
    imdbRating: '',
    img: '',
    rated: '',
    year: '',
    runtime: '',
    genre: '',
    plot: '',
    actors: '',
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = form.querySelector('input');

    getResourse(input.value).then((data) => { 
        const movieID = data.Search[0].imdbID;   
    
        getResourse2(movieID).then((data) => { 
            console.log(data);
            const { Title: name, imdbRating, Poster: img, Rated: rated, Year: year, Runtime: runtime, Genre: genre, Plot: plot, Actors: actors} = data;

            movieInfo = {
                ...movieInfo,
                name,
                imdbRating,
                img,
                rated,
                year,
                runtime,
                genre,
                plot,
                actors
            };

            renderProperty(movieInfo)
        })
    })
});

const renderProperty = (movieInfo) => {
    const movieHtml = `<div class="movie">
                            <div class="movie__info">
                                <img class="movie__poster" src=${movieInfo.img}>
                                <div>
                                    <h1 class="movie__title">${movieInfo.name}</h1>
                                    <div class="movie__rating">
                                        <img src="./assets/img/IMDb.png">
                                        <h4>${movieInfo.imdbRating}</h4>
                                    </div>
                                    <div class="movie__details">
                                        <span>${movieInfo.rated}</span>
                                        <span>${movieInfo.year}</span>
                                        <span>${movieInfo.runtime}</span>
                                    </div>
                                    <div class="movie__genre">
                                        ${movieInfo.genre}
                                    </div>
                                </div>
                            </div>
                            <div class="movie__wrap">
                                <h3 class="movie__wrap-title">Plot:</h3>
                                <p class="movie__wrapp-text">
                                ${movieInfo.plot}
                                </p>
                            </div>
                            <div class="movie__wrap">
                                <h3 class="movie__wrap-title">Actors:</h3>
                                <p class="movie__wrapp-text">
                                ${movieInfo.actors}
                                </p>
                            </div>
                        </div>`

    result.innerHTML = movieHtml; 
}