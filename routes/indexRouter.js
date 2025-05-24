const { Router } = require("express");
const indexRouter = Router();
const { getRoot } = require("../controllers/indexController")

indexRouter.get("/", getRoot)

module.exports = indexRouter;