const db = require("../db/queries");

const genreAddPost = async (req, res) => {
  console.log("Add genre to the db");
};

const genresAllGet = async (req, res) => {
  const genres = await db.getAllGenres();
  res.render("genres", { genres });
};

module.exports = { genreAddPost, genresAllGet };
