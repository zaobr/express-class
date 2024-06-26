const express = require("express");

const app = express();
app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const userConstrollers = require("./controllers/userControllers");


app.get("/api/users", userConstrollers.getUsers);
app.post("/api/users", userConstrollers.postUser);
app.get("/api/users/:id", userConstrollers.getUserById);
app.put("/api/users/:id", userConstrollers.updateUser);
app.get("/api/movies", movieControllers.getMovies);
app.post("/api/movies", movieControllers.postMovie);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.put("/api/movies/:id", movieControllers.updateMovie);



module.exports = app;
