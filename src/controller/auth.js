const pool = require("../connect");
const { verify, auth } = require("../middleware/jwt_vality");



class UserControl {
  constructor(req) {
    this.LoginUser;
  }
   LoginUser(req, res) {
    var SQLquery = `select * from users_table where user_name='${req.body.name}' and user_password='${req.body.password}'`;
    pool.query(SQLquery).on('result',result=>{
      const token = auth(result.user_id) 
      res.send({'token':token});
    })
  }
  RegisterUser(req,res){
    var SQLquery = `insert into users_table (user_name,user_password) values ('${req.body.name}','${req.body.password}')`
    pool.query(SQLquery).on('result',result=>{
      if(result.affectedRows !== 0){
        res.json({"message":"User Registere with sucess"})
      }
    }).on('error',err=>res.json({"erro":"User not registred,plase insert other name"}))
  }

}

module.exports = UserControl;
