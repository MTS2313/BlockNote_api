const pool = require("../connect");
const { verify } = require("../middleware/jwt_vality");

class notes {
  CreateNote(req, res) {
    let id = verify(req.body.token);
    let SQLquery = `insert into notes (note_desc,note_fkId) values ('${req.body.desc}','${id}')`;
    pool
      .query(SQLquery)
      .on("error", (err) => {
        if (err) throw err;
      })
      .on("result", (result) => {
        res.json({ message: "note adicioned from your notes" });
      });
  }
  DeleteNote(req, res) {
    let SQLquery = `delete from notes where note_id=${req.body.id}`;
    let JWTRes = verify(req.body.token);
    if (JWTRes) {
      pool
        .query(SQLquery)
        .on("result", (result) => {
          if (result.affectedRows !== 0) {
            res.json({ message: "the note was removed from your notes" });
          } else {
            res.json({ message: "the note not exist in you list notes" });
          }
        })
        .on("error", (err) => {
          if (err) throw err;
        });
    }
  }
  UpdataNote(req, res) {
    let SQLquery = `UPDATE notes set note_desc='${req.body.newdesc}' where note_id='${req.body.id}'`;
    let id = verify(req.body.token);
    if (id) {
      pool
        .query(SQLquery)
        .on("result", (result) => {
          if (result.affectedRows !== 0) {
            res.json({ message: "the your note was atualized" });
          } else {
            res.json({ message: "the note not modifyred or not indentifed" });
          }
        })
        .on("error", (err) => {
          if (err) throw err;
        });
    }
  }
  ListNotes(req, res) {
    let id = verify(req.body.token);
    let SQLquery = `select * from notes where note_fkId='${id}'`;
    if (id) {
      pool
        .query(SQLquery, (err, result, fields) => {
            res.json(result)
        })
        .on("error", (err) => {
          if (err) throw err;
        });
    }
  }
}

module.exports = notes;
