const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4fea693509a74a5ed4e894bb3e312cf5&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/original';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=4fea693509a74a5ed4e894bb3e312cf5&query=';

const row = document.getElementById("row");
const form = document.getElementById("form");
const search = document.getElementById("query");

renderMovies(APILINK);

async function renderMovies(url) {
  fetch(url).then( res => res.json())
  .then(function(data){
    console.log(data.results)
    data.results.forEach(element => {
    const {id, title, release_date, poster_path, vote_average, genre_ids} = element;
    const movieTemplate = `
      <div class="column">
        <div class="card">
          <img class='thumbnail' src='${IMG_PATH + poster_path}' alt='${title} Poster'">
          <h3>${title}</h3>
          <p class="rating">User Ratings: ${vote_average.toFixed(1)}/10</p>
          <p class="date">Release Date: ${release_date}</p>
      </div>
    `
    row.innerHTML += movieTemplate;
    })
  }
)}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  row.innerHTML = '';
  const searchItem = search.value;
  if (searchItem) {
    renderMovies(SEARCHAPI + searchItem);
    search.value = '';
  }
})