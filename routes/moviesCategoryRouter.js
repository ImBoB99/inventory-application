const { Router } = require("express")
const moviesCategoryRouter = Router();
const moviesController = require("../controllers/moviesController")

moviesCategoryRouter.get("/", moviesController.moviesAllGet)
moviesCategoryRouter.post("/addMovie", moviesController.movieAddPost)

module.exports = moviesCategoryRouter;