const jwt = require('jsonwebtoken')

function auth(id){
    return jwt.sign({id},process.env.SECRET,{expiresIn:'7d'})
}
function verify(token){
    let id
    jwt.verify(token,process.env.SECRET,(err,decoded)=>{
        if (err) throw err
        id = decoded.id
    })
    
    return id
}

module.exports = {auth,verify}