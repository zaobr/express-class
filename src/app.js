const express = require("express");

const app = express();
app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const userConstrollers = require("./controllers/userControllers");
const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");
const authentication = require("./middlewares/auth");



app.get("/api/users", userConstrollers.getUsers);
app.get("/api/users/:id", userConstrollers.getUserById);
app.post("/api/users", authentication.hashPassword, validateUser, userConstrollers.postUser);

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.put("/api/users/:id", authentication.verifyToken, authentication.hashPassword, validateUser, userConstrollers.updateUser);
app.delete("/api/users/:id", authentication.verifyToken, userConstrollers.deleteUser);


app.post("/api/login", userConstrollers.getUserByEmail ,authentication.verifyPassword)

app.use(authentication.verifyToken);

app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.put("/api/movies/:id", validateMovie, movieControllers.updateMovie);
app.delete("/api/movies/:id", movieControllers.deleteMovie);

module.exports = app;
