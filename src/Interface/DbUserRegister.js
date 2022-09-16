const sql = require("mssql");
const config = require("../connect");

async function chackuser(user) {
  var result;
  var SQLquery = `select user_columm from users_table where user_columm='${user}'`;
  await sql.connect(config).then((conn) =>
    conn.query(SQLquery).then((res, err) => {
      if (res.rowsAffected[0] !== 0) {
        result = false;
      } else {
        result = true;
      }
    })
  );
  return result;
}

async function insertUser(user, password) {
  var RegisterStatus;
  var SQLquery = `insert into users_table (user_columm,password_columm) values ('${user}','${password}')`;
  await sql.connect(config).then((conn) => conn.query(SQLquery)).then((res,err) => RegisterStatus = res)
  return RegisterStatus
}

async function DBRegister(user, password) {
  const resp = await chackuser(user);
  if (resp) {
    const RegisterResp = await insertUser(user, password);
    return RegisterResp.rowsAffected
  } else {
    return { unsucess: "usuario já existe" };
  }
}
module.exports = DBRegister;
