const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "notepad_db",
});

module.exports = pool;
