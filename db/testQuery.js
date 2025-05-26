const pool = require("./pool")

async function testQuery(name, genreId, actorIds) {
  const {rows} = await pool.query("INSERT INTO movies (name, genre_id) VALUES ($1, $2) RETURNING id", [name, genreId]);
  const insertedMovieId = rows[0].id;
  actorIds.forEach(actor => {
    pool.query("INSERT INTO movie_actors (movie_id, actor_id) VALUES ($1, $2)", [insertedMovieId, actor])
  })
}

testQuery("Aliens Test 2", 1, [1]);