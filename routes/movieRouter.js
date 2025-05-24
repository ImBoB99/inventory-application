const { Router } = require("express")
const movieRouter = Router();

const moviesController = require("../controllers/moviesController")

movieRouter.get("/:id", moviesController.movieByIdGet)

module.exports = movieRouter;