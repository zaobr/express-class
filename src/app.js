const express = require("express");

const app = express();
app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const userConstrollers = require("./controllers/userControllers");
const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");
const hashPassword = require("./middlewares/auth");



app.get("/api/users", userConstrollers.getUsers);
app.post("/api/users", hashPassword, validateUser, userConstrollers.postUser);
app.get("/api/users/:id", userConstrollers.getUserById);
app.put("/api/users/:id", hashPassword, validateUser, userConstrollers.updateUser);
app.delete("/api/users/:id", userConstrollers.deleteUser)

app.get("/api/movies", movieControllers.getMovies);
app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.put("/api/movies/:id", validateMovie, movieControllers.updateMovie);
app.delete("/api/movies/:id", movieControllers.deleteMovie)



module.exports = app;
