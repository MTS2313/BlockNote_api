const DbRequire = require("./../Interface/DbUserAuth");
const jwt = require("jsonwebtoken");
const DBRegister = require("../Interface/DbUserRegister");


class UserControl {
  constructor(BodyUser, BodyPassword) {
    this.user = BodyUser;
    this.password = BodyPassword;
  }
  
  //  criar token de acesso
  async login(user, password) {
    const DBResp = await DbRequire(user, password);
    // IdUser e usado como chave publica
    const IdUser = DBResp.recordset[0].id;
    if (!(DBResp.rowsAffected[0] === 0)) {
      const token = jwt.sign({ IdUser }, process.env.SECRET, {
        expiresIn: "7d",
      });
      return { token: token };
    } else {
      return { Error: "Usuario não encontrado!!!" };
    }
}


// verificar token
  verify(token) {
    var result;
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      result = err ? { auth: "unsucess" } : { "auth:": "sucess" };
    });
    return result;
  }

  async register(user,password){
    const RegisterResp = await DBRegister(user,password)
  return RegisterResp.length === 1 ? {"status":"registrado"} : {"status" : "nao registrado"}
}
}

module.exports = UserControl;
