const database = require("../../database")

const getUsers = (req, res) => {
  let sql = "SELECT * FROM users";

  if(req.query.language && (!req.query.city)){
    sql += " WHERE language = ?"
    let sqlValues = [req.query.language];

    database.query(sql, sqlValues)
    .then((result) => {
      const [users] = result;

        if (users.length > 0) {  
          res.json(users);
        } else {
          res.status(200).json([]);
        }
    })
    .catch((err) => res.status(500).send(err))
  }
  if(req.query.city && (!req.query.language)){
    sql += " WHERE city = ?"
    let sqlValues = [req.query.city];

    database.query(sql, sqlValues)
    .then((result) => {
      const [users] = result;

        if (users.length > 0) {  
          res.json(users);
        } else {
          res.status(200).json([]);
        }
    })
    .catch((err) => res.status(500).send(err))
  }
  if(req.query.language && req.query.city){
    sql += " WHERE language = ? and city = ?"
    let sqlValues = [req.query.language, req.query.city];

    database.query(sql, sqlValues)
    .then((result) => {
      const [users] = result;

        if (users.length > 0) {  
          res.json(users);
        } else {
          res.status(200).json([]);
        }
    })
    .catch((err) => res.status(500).send(err))
  }
  else if(!req.query.language && !req.query.city){
    database.query(sql)
    .then((result) => {
      const [users] = result;

        if (users.length > 0) {
          res.json(users);
        } else {
          res.status(200).json([]);
        }
    })
    .catch((err) => res.status(500).send(err))
  }
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database.query(`SELECT * FROM users WHERE id = ?`, id)
  .then((result) => {
    const [user] = result;

      if (user.length > 0) {
        res.status(200).json(user);
      } else {
        res.status(404).send("Not Found");
      }
  })
  .catch((err) => res.status(500).send(err))
};

const postUser = (req, res) => {
  const {firstname, lastname, email, city, language} = req.body;
  const sql = `INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)`

  database.query(sql, [firstname, lastname, email, city, language])
  .then(([result]) => {
    res.status(201).send({id: result.insertId})
  })
  .catch((err) => res.status(500).send(err))
};

const updateUser = (req, res) => {
  const {firstname, lastname, email, city, language} = req.body;
  const sql = `UPDATE users SET firstname=?, lastname=?, email=?, city=?, language=? WHERE id = ?`
  const id = parseInt(req.params.id)

  database.query(sql, [firstname, lastname, email, city, language, id])
  .then(([result]) => {
    console.log(id)
    id > 0 ? res.status(204).send(result) : res.status(404).send(result.info)
  })
  .catch((err) => res.status(500).send(err))
};

module.exports = {
    getUsers,
    getUserById,
    postUser,
    updateUser
  };