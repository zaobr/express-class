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

module.exports = {
    getUsers,
    getUserById,
  };