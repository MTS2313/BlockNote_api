const sql = require("mssql");
const config = require("../connect");

async function InsertNote(id, content) {
  var SQLquery = `insert into Notes (NoteId,NoteDesc) values ('${id}','${content}')`;
  var RowStatus;
  await sql
    .connect(config)
    .then((conn) =>
      conn.query(SQLquery).then((resp) => RowStatus = resp.rowsAffected[0])
      );
      return RowStatus
    }

module.exports = InsertNote;
