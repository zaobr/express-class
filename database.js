const mysql = require("mysql2/promise");

require("dotenv").config();

const database = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
  
database
  .getConnection()
  .then(
    console.log("Database reached")
  )
  .catch((err) => {
    console.error(err)
});


module.exports = database;