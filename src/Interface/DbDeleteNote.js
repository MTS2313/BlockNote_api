const sql = require("mssql");
const config = require("../connect");

async function DeleteNote(Id, IdNote) {
  let SQLquery = `delete from Notes where NoteIdpk='${IdNote}' and NoteId='${Id}'`;
  let DbResp;
  await sql.connect(config).then((conn) =>conn.query(SQLquery).then((res) => DbResp = res.rowsAffected[0]));
  return DbResp;
}
module.exports = DeleteNote;
