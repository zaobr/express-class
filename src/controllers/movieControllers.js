const database = require("../../database")

const getMovies = (req, res) => {
  database.query("SELECT * FROM movies")
  .then((result) => {
    const [movies] = result;

      if (movies.length > 0) {
        res.json(movies);
      } else {
        res.status(404).send("Not Found");
      }
  })
  .catch((err) => res.status(500).send(err))
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database.query(`SELECT * FROM movies WHERE id = ?`, id)
  .then((result) => {
    const [movie] = result;

      if (movie.length > 0) {
        res.status(200).json(movie);
      } else {
        res.status(404).send("Not Found");
      }
  })
  .catch((err) => res.status(500).send(err))
};

module.exports = {
  getMovies,
  getMovieById,
};
