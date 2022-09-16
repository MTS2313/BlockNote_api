const sql = require("mssql");
const config = require("../connect");
const jwt = require("jsonwebtoken");

async function DbRequire(name, password) {
  var sqlrow = `select id,user_columm,password_columm from users_table where user_columm='${name}' and password_columm='${password}'`;
  var resp
  const user = await sql
    .connect(config)
    .then((conn) => conn.query(sqlrow))
    .then((res,err) => {
      resp = res
    })
    return resp
}
module.exports = DbRequire;
