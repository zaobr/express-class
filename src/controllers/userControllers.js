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

  database.query(`SELECT firstname, lastname, email, city, language FROM users WHERE id = ?`, id)
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

const getUserByEmail = (req, res, next) => {
  database.query(`SELECT id, email, hashedPassword FROM users WHERE email= ?`, req.body.email)
  .then((result) => {
    const [user] = result;

    if (user.length > 0) {
      req.user = user[0];
      next();
    } else {
      res.sendStatus(401);
    }
  })
  .catch((err) => res.status(500).send(err))
};

const postUser = (req, res) => {
  const {firstname, lastname, email, city, language, hashedPassword} = req.body;
  const sql = `INSERT INTO users (firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)`

  database.query(sql, [firstname, lastname, email, city, language, hashedPassword])
  .then(([result]) => {
    res.status(201).send({id: result.insertId})
  })
  .catch((err) => res.status(500).send(err))
};

const updateUser = (req, res) => {
  const {firstname, lastname, email, city, language, hashedPassword} = req.body;
  const sql = `UPDATE users SET firstname=?, lastname=?, email=?, city=?, language=?, hashedPassword=? WHERE id = ?`
  const id = parseInt(req.params.id)

  database.query(sql, [firstname, lastname, email, city, language, hashedPassword, id])
  .then(([result]) => {
    id > 0 ? res.status(204).send(result) : res.status(404).send(result.info)
  })
  .catch((err) => res.status(500).send(err))
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database.query("DELETE FROM users WHERE id=?", id)
  .then(([result]) => {
    result.affectedRows === 0 ? res.sendStatus(404) : res.sendStatus(204)
  })
  .catch((err) => res.status(500).send(err))
}

module.exports = {
    getUsers,
    getUserById,
    postUser,
    updateUser,
    deleteUser,
    getUserByEmail
  };