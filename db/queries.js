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
  const { rows } = await pool.query("SELECT * FROM genres ORDER BY id ASC");
  return rows;
}

async function getAllActors() {
  const { rows } = await pool.query("SELECT * FROM actors ORDER BY id ASC");
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
  `;

  const { rows } = await pool.query(SQL, [id]);
  return createMoviesData(rows)[0];
}

async function addActor(name) {
  await pool.query("INSERT INTO actors (name) VALUES ($1)", [name]);
}

async function addGenre(name) {
  await pool.query("INSERT INTO genres (name) VALUES ($1)", [name]);
}

async function addMovie(name, genreId, actorIds) {
  //name of movie "Aliens 3"
  //genreId "1"
  // ["Sidney Sweeney"] or ["Kaley Coco", "Howard Walowitz"]

  // transactional db query to avoid partially filled data
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      "INSERT INTO movies (name, genre_id) VALUES ($1, $2) RETURNING id",
      [name, genreId],
    );
    const insertedMovieId = rows[0].id;

    // Clean up actorIds: trim and remove empty strings
    actorIds = actorIds.map((id) => id.trim()).filter((id) => id.length > 0);

    if (!actorIds || actorIds.length === 0) {
      throw new Error("At least one actor is required to add a movie.");
    }

    for (const actorId of actorIds) {
      await client.query("INSERT INTO movie_actors (movie_id, actor_id) VALUES ($1, $2)", [
        insertedMovieId,
        actorId,
      ]);
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function deleteGenre(id) {
  await pool.query("DELETE FROM genres WHERE id = $1", [id]);
}

async function deleteActor(id) {
  await pool.query("DELETE FROM actors WHERE id = $1", [id]);
}

async function deleteMoviesWithoutActors() {
  await pool.query(`
    DELETE FROM movies
    WHERE id NOT IN (SELECT DISTINCT movie_id FROM movie_actors)
  `);
}

async function deleteMovie(id) {
  await pool.query("DELETE FROM movies WHERE id = $1", [id]);
}

async function editActor(id, name) {
  await pool.query("UPDATE actors SET name = $2 WHERE id = $1", [id, name])
}

async function editGenre(id, name) {
  await pool.query("UPDATE genres SET name = $2 WHERE id = $1", [id, name])
}

module.exports = {
  getAllMovies,
  getAllGenres,
  getAllActors,
  getMovieById,
  addActor,
  addGenre,
  addMovie,
  deleteGenre,
  deleteActor,
  deleteMoviesWithoutActors,
  deleteMovie,
  editActor,
  editGenre,
};
