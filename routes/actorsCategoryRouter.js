const { Router } = require("express")
const actorsCategoryRouter = Router();

const actorsController = require("../controllers/actorsController.js")

actorsCategoryRouter.get("/", actorsController.actorsAllGet);
actorsCategoryRouter.post("/addActor", actorsController.actorAddPost);
actorsCategoryRouter.post("/deleteActor", actorsController.actorsDeletePost)
module.exports = actorsCategoryRouter;