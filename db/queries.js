const pool = require("./pool");
const createMoviesData = require("../helpers/createMovieData");

async function getAllMovies() {
  const SQL = `
  SELECT movies.id, movies.name AS movieName, genres.name AS genreName, actors.id AS actorId, actors.name AS actorName
  FROM movies
  INNER JOIN genres ON movies.genre_id = genres.id
  INNER JOIN movie_actors ON movies.id = movie_actors.movie_id
  INNER JOIN actors ON movie_actors.actor_id = actors.id;
`;
  const { rows } = await pool.query(SQL);
  return createMoviesData(rows);
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
}

async function getAllActors() {
  const { rows } = await pool.query("SELECT * FROM actors");
  return rows;
}

async function getMovieById(id) {
  const SQL = `
  SELECT movies.id, movies.name AS movieName, genres.name AS genreName, actors.id AS actorId, actors.name AS actorName
  FROM movies
  INNER JOIN genres ON movies.genre_id = genres.id
  INNER JOIN movie_actors ON movie_actors.movie_id = movies.id
  INNER JOIN actors ON movie_actors.actor_id = actors.id
  WHERE movies.id = ($1);
  `

  const {rows} = await pool.query(SQL, [id])
  return createMoviesData(rows)[0];
}

module.exports = { getAllMovies, getAllGenres, getAllActors, getMovieById };
