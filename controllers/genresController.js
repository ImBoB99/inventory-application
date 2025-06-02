const db = require("../db/queries");

const genreAddPost = async (req, res) => {
  console.log("Add genre to the db");
  const name = req.body.genreName;

  try {
    await db.addGenre(name);
    res.redirect("/genres");
  } catch (error) {
    console.error("Error adding genre:", error);
    res.redirect("/genres");
  }
};

const genresAllGet = async (req, res) => {
  try {
    const genres = await db.getAllGenres();
    res.render("genres", { genres });
  } catch (error) {
    console.error("Error getting genres:", error);
    res.render("genres", { genres: [], error: "Failed to load genres." });
  }
};

const genreDeletePost = async (req, res) => {
  console.log("Remove genre from the db");
  const genreId = req.body.id;

  if (!genreId) {
    return res.status(400).json({ success: false, message: "Missing genre ID."})
  } else {
    try {
      await db.deleteGenre(genreId);
      res.json({ success: true, message: `Genre ${genreId} deleted.` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "There was a server error during deletion" });
    }
  }
}

const genreEditPost = async (req, res) => {
  console.log("Edit genre :)");
  const { genreId, genreName } = req.body;

  if (!genreId) {
    res.status(400).json({success: false, message: "Missing actor ID."})
  } else {
    try {
      await db.editGenre(genreId, genreName)
      res.redirect("/genres");;
    } catch (error) {
      console.error(error);
      res.redirect("/genres");;
    }
  }

};

module.exports = { genreAddPost, genresAllGet, genreDeletePost, genreEditPost };
