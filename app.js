const express = require("express");
const app = express();

const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const movieRouter = require("./routes/movieRouter");
const moviesCategoryRouter = require("./routes/moviesCategoryRouter");
const genresCategoryRouter = require("./routes/genresCategoryRouter");
const actorsCategoryRouter = require("./routes/actorsCategoryRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.use("/movie", movieRouter);
app.use("/movies", moviesCategoryRouter);

app.use("/genres", genresCategoryRouter);
app.use("/actors", actorsCategoryRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));
