require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL
);

CREATE TABLE IF NOT EXISTS movies (
     id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     name VARCHAR (255) NOT NULL,
     genre_id INTEGER NOT NULL REFERENCES genres(id)
);

CREATE TABLE IF NOT EXISTS actors (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL
);

CREATE TABLE IF NOT EXISTS movie_actors (
    movie_id INTEGER NOT NULL REFERENCES movies(id),
    actor_id INTEGER NOT NULL REFERENCES actors(id),
    PRIMARY KEY (movie_id, actor_id)
);

INSERT INTO genres (name) VALUES ('Sci-Fi');
INSERT INTO movies (name, genre_id) VALUES ('Aliens 1', 1), ('Aliens 2', 1);
INSERT INTO actors (name) VALUES ('Sigourney Weaver'), ('John Hurt'), ('Ian Holm'), ('Barry Dean Stanton'), ('Michael Biehn'), ('Carrie Henn');
INSERT INTO movie_actors (movie_id, actor_id) VALUES (1, 1), (1, 2), (1, 3), (1, 4), (2, 1), (2, 5), (2, 6);
`;

async function main() {
  console.log("Seeding new db");
  const client = new Client({
    connectionString: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done")
}

main();