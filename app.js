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
app.use(express.json());

app.use("/", indexRouter);

app.use("/movie", movieRouter);
app.use("/movies", moviesCategoryRouter);

app.use("/genres", genresCategoryRouter);
app.use("/actors", actorsCategoryRouter);

// 404 handler (must come last, after all routes)
app.use((req, res) => {
  res.status(404).render("404");
});

// 500 error handler (catches thrown errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));
