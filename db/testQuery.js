const pool = require("./pool")

async function testQuery() {
  const SQL = `
  SELECT movies.id, movies.name AS movieName, genres.name AS genreName, actors.id AS actorId, actors.name AS actorName
  FROM movies
  INNER JOIN genres ON movies.genre_id = genres.id
  INNER JOIN movie_actors ON movie_actors.movie_id = movies.id
  INNER JOIN actors ON movie_actors.actor_id = actors.id
  WHERE movies.id = 1;
  `

  const {rows} = await pool.query(SQL)

  console.log(rows)
}

testQuery();