const db = require("../db/queries")

const movieAddPost = async (req, res) => {
  let { movieName, movieGenre, movieActors } = req.body;
  movieActors = movieActors.split(",");
  await db.addMovie(movieName, movieGenre, movieActors);
  res.redirect("/movies")
};

const movieByIdGet = async (req, res) => {
  const id = req.params.id;
  const movie = await db.getMovieById(id);
  res.render("movie", {movie})

};

const moviesAllGet = async (req, res) => {
  const movies = await db.getAllMovies();
  const genres = await db.getAllGenres();
  const actors = await db.getAllActors();
  res.render("movies", {movies, genres, actors})
};

module.exports = { moviesAllGet, movieAddPost, movieByIdGet };
