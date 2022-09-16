const sql = require("mssql");
const config = require("../connect");

 async function GetNotes(id){
    let SQLquery = `select * from Notes where NoteId='${id}'`;
    let resp;
    await sql.connect(config).then(conn=>conn.query(SQLquery).then(res=>resp = res.recordset))
    return resp;
}
module.exports = GetNotes