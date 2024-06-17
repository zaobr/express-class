const express = require('express');

const app = express();
const port = 5001;



app.listen(port, () => {
    console.info(`Server is listening on port ${port}`)
}).on("error", (err) => {
    console.error(`Error": ${err.message}`)
})



const welcomeMovies = (req, res) => {
    res.send("Welcome to my favourite movie list")
}

const getMovies = (req, res) => {
    res.status(200).json(movies);
}

const searchMovie = (req, res) => {
    const found = movies.find((movie) => movie.id == req.params.id);
    if(found){
        res.status(200).json(found)
    }
    else{
        res.status(404).send("Not found");
    }
}


app.get("/api/movies/:id", searchMovie);
app.get("/api/movies", getMovies);
app.get("/", welcomeMovies);