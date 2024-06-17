const database = require("../../database")

const getUsers = (req, res) => {
  database.query("SELECT * FROM users")
  .then((result) => {
    const [users] = result;

      if (users.length > 0) {
        res.json(users);
      } else {
        res.status(404).send("Not Found");
      }
  })
  .catch((err) => res.status(500).send(err))
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