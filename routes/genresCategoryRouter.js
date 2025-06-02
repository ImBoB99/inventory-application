const { Router } = require("express")
const genresCategoryRouter = Router();
const genresController = require("../controllers/genresController")
const {validateGenre, validateGenreId} = require("../middleware/genreValidation");

genresCategoryRouter.get("/", genresController.genresAllGet);
genresCategoryRouter.post("/addGenre", validateGenre, genresController.genreAddPost);
genresCategoryRouter.post("/deleteGenre", validateGenreId, genresController.genreDeletePost);
genresCategoryRouter.post("/editGenre", validateGenre, validateGenreId, genresController.genreEditPost);

module.exports = genresCategoryRouter;