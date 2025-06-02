const db = require("../db/queries");

const actorAddPost = async (req, res) => {
  console.log("Add actor to the db");
  const name = req.body.actorName;

  try {
    await db.addActor(name);
    res.redirect("/actors");
  } catch (error) {
    console.error("Error adding actor:", error);
    res.redirect("/actors");
  }
};

const actorsAllGet = async (req, res) => {
  try {
    const actors = await db.getAllActors();
    res.render("actors", { actors });
  } catch (error) {
    console.error("Error getting actors:", error);
    res.render("actors", { actors: [], error: "Failed to load actors." });
  }
};

const actorsDeletePost = async (req, res) => {
  console.log("Delete actor from db");
  const actorId = req.body.id;

  if (!actorId) {
    res.status(400).json({ success: false, message: "Missing actor ID." });
  } else {
    try {
      await db.deleteActor(actorId);
      await db.deleteMoviesWithoutActors();
      res.json({ success: true, message: `Actor ${actorId} deleted.` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "There was a server error during deletion" });
    }
  }
};

const actorEditPost = async (req, res) => {
  console.log("Edit actor :)");
  const { actorId, actorName } = req.body;

  if (!actorId) {
    res.status(400).json({success: false, message: "Missing actor ID."})
  } else {
    try {
      await db.editActor(actorId, actorName)
      res.redirect("/actors");;
    } catch (error) {
      console.error(error);
      res.redirect("/actors");;
    }
  }

};

module.exports = { actorAddPost, actorsAllGet, actorsDeletePost, actorEditPost };
