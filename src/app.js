const express = require("express");

const app = express();
app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const userConstrollers = require("./controllers/userControllers");
const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");



app.get("/api/users", userConstrollers.getUsers);
app.post("/api/users", validateUser, userConstrollers.postUser);
app.get("/api/users/:id", userConstrollers.getUserById);
app.put("/api/users/:id", validateUser, userConstrollers.updateUser);
app.get("/api/movies", movieControllers.getMovies);
app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.put("/api/movies/:id", validateMovie, movieControllers.updateMovie);



module.exports = app;
