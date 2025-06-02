const { Router } = require("express")
const genresCategoryRouter = Router();

const genresController = require("../controllers/genresController")

genresCategoryRouter.get("/", genresController.genresAllGet);
genresCategoryRouter.post("/addGenre", genresController.genreAddPost);
genresCategoryRouter.post("/deleteGenre", genresController.genreDeletePost);
genresCategoryRouter.post("/editGenre", genresController.genreEditPost);

module.exports = genresCategoryRouter;