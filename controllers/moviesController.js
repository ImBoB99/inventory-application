const db = require("../db/queries")

const movieAddPost = async (req, res) => {
  console.log("Add post to the db");
};

const movieByIdGet = async (req, res) => {
  console.log("Get a post by id");
};

const moviesAllGet = async (req, res) => {
  console.log("Get ALL movies");
  const movies = await db.getAllMovies();
  console.log(movies)
};

module.exports = { moviesAllGet, movieAddPost, movieByIdGet };
