const sql = require("mssql");
const config = require("../connect");

async function UpdateNote(desc,id,NoteId){
    let SQLquery = `UPDATE Notes set NoteDesc = '${desc}' where NoteId='${NoteId}' and NoteIdpk='${id}'`;
    let resp;
    await sql.connect(config).then(conn=>conn.query(SQLquery).then(res=>resp = res.rowsAffected[0]))
    return resp
}
module.exports =  UpdateNote;