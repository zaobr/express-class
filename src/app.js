const express = require("express");

const app = express();

const movieControllers = require("./controllers/movieControllers");
const userConstrollers = require("./controllers/userControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", userConstrollers.getUsers);
app.get("/api/users/:id", userConstrollers.getUserById);

module.exports = app;
