const db = require("../db/queries")

const movieAddPost = async (req, res) => {
  console.log("Add post to the db");
};

const movieByIdGet = async (req, res) => {
  const id = req.params.id;
  const movie = await db.getMovieById(id);
  res.render("movie", {movie})

};

const moviesAllGet = async (req, res) => {
  const movies = await db.getAllMovies();
  res.render("movies", {movies})
};

module.exports = { moviesAllGet, movieAddPost, movieByIdGet };
