function addMovie(event) {
    event.preventDefault();
    const newMovie = { };

    // Input fields
    let title = document.querySelector("#title");
    let personalRating = document.querySelector("#p-rating");
    let dateFirstWatched = document.querySelector("#f-watched");
    let watchCounter = document.querySelector("#counter");

    // Add new movie info
    newMovie.title = title.value;
    newMovie.personalRating = personalRating.value;
    newMovie.dateFirstWatched = dateFirstWatched.value;
    newMovie.watchCounter = watchCounter.value;

    // Clear input fields
    title.value = "";
    personalRating.value = "";
    dateFirstWatched.value = "";
    watchCounter.value = "";

    console.log(newMovie);
}

function deleteMovie() {

}

