const db = require("../db/queries")

const actorAddPost = async (req, res) => {
  console.log("Add actor to the db");
};

const actorsAllGet = async (req, res) => {
  const actors = await db.getAllActors();
  res.render("actors", {actors})
};

module.exports = { actorAddPost, actorsAllGet };