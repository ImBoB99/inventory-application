const db = require("../db/queries");

const movieAddPost = async (req, res) => {
  let { movieName, movieGenre, movieActors } = req.body;
  movieActors = movieActors.split(",");

  try {
    await db.addMovie(movieName, movieGenre, movieActors);
    res.redirect("/movies");
  } catch (error) {
    console.error("Failed to add movie:", error);
    res.redirect("/movies");
  }
};

const movieByIdGet = async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await db.getMovieById(id);

    if (!movie) {
      console.warn(`Movie with ID ${id} not found`);
      return res.status(404).render("404");
    }

    res.render("movie", { movie });
  } catch (error) {
    console.error("Error retrieving movie:", error);
    res.status(500).render("500"); // Or fall back to "404" if no 500 page exists
  }
};

const moviesAllGet = async (req, res) => {
  try {
    const movies = await db.getAllMovies();
    const genres = await db.getAllGenres();
    const actors = await db.getAllActors();

    res.render("movies", { movies, genres, actors });
  } catch (error) {
    console.error("Error retrieving movies data:", error);
    res.render("movies", {
      movies: [],
      genres: [],
      actors: [],
      error: "Failed to load movie data. Please try again later.",
    });
  }
};

const movieDeletePost = async (req, res) => {
  console.log("Remove movie from the db");
  const movieId = req.body.id;

  if (!movieId) {
    return res.status(400).json({ success: false, message: "Missing movie ID." });
  } else {
    try {
      await db.deleteMovie(movieId);
      res.json({ success: true, message: `Movie ${movieId} deleted.` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "There was a server error during deletion" });
    }
  }
};

module.exports = { moviesAllGet, movieAddPost, movieByIdGet, movieDeletePost };
