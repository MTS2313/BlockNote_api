const pool = require("../connect");
const { verify, auth } = require("../middleware/jwt_vality");

class UserControl {
  constructor(req) {
    this.LoginUser;
  }
  LoginUser(req, res) {
    var SQLquery = `select * from users_table where user_name='${req.body.name}' and user_password='${req.body.password}'`;
    
    pool.query(SQLquery, (err, result, fields) => {
      console.log(result);
      if (result.length === 1) {
        let token = auth(result[0].user_id);
        res.json({ token: token, token_status: true });
      } else {
        res.json({ token_status: false });
      }
    });
  }
  RegisterUser(req, res) {
    var SQLquery = `insert into users_table (user_name,user_password) values ('${req.body.name}','${req.body.password}')`;
    if (req.body.name.length > 6) {
      pool
        .query(SQLquery)
        .on("result", (result) => {
          if (result.affectedRows !== 0) {
            res.json({ register_status:true });
          }
        })
        .on("error", (err) =>
          res.json({ register_status:false })
        );
    } else {
      res.json({ register_status:false });
    }
  }
}

module.exports = UserControl;
