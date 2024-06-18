const database = require("../../database")

const getMovies = (req, res) => {
  let sql = "SELECT * FROM MOVIES";

  if(req.query.color && (!req.query.max_duration)){
    sql += " WHERE color = ?"
    let sqlValues = [req.query.color];

    database.query(sql, sqlValues)
    .then((result) => {
      const [movies] = result;

        if (movies.length > 0) {  
          res.json(movies);
        } else {
          res.status(404).send("Not Found");
        }
    })
    .catch((err) => res.status(500).send(err))
  }
  if(req.query.max_duration && (!req.query.color)){
    sql += " WHERE duration = ?"
    let sqlValues = [req.query.max_duration];

    database.query(sql, sqlValues)
    .then((result) => {
      const [movies] = result;

        if (movies.length > 0) {  
          res.json(movies);
        } else {
          res.status(404).send("Not Found");
        }
    })
    .catch((err) => res.status(500).send(err))
  }
  if(req.query.color && req.query.max_duration){
    sql += " WHERE color = ? and duration = ?"
    let sqlValues = [req.query.color, req.query.max_duration];

    database.query(sql, sqlValues)
    .then((result) => {
      const [movies] = result;

        if (movies.length > 0) {  
          res.json(movies);
        } else {
          res.status(404).send("Not Found");
        }
    })
    .catch((err) => res.status(500).send(err))
  }
  else if(!req.query.color && !req.query.max_duration){
    database.query(sql)
      .then((result) => {
        const [movies] = result;
  
          if (movies.length > 0) {  
            res.json(movies);
          } else {
            res.status(404).send("Not Found");
          }
      })
      .catch((err) => res.status(500).send(err))
  }
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

const postMovie = (req, res) => {
  const {title, director, year, color, duration} = req.body
  const sql = `INSERT INTO movies (title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)`

  database.query(sql, [title, director, year, color, duration])
  .then(([result]) => {
    res.status(201).send({id: result.insertId})
  })
  .catch((err) => res.status(500).send(err))
};

const updateMovie = (req, res) => {
  const {title, director, year, color, duration} = req.body
  const sql = `UPDATE movies SET title=?, director=?, year=?, color=?, duration=? WHERE id = ?`

  database.query(sql, [title, director, year, color, duration, req.params.id])
  .then(([result]) => {
    res.status(204).send(result)
  })
  .catch((err) => res.status(500).send(err))
};


module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  updateMovie
};
