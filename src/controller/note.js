const pool = require("../connect");
const { verify } = require("../middleware/jwt_vality");

class notes {
  CreateNote(req, res) {
    let id = verify(req.body.token);
    let SQLquery = `insert into notes (node_name,note_desc,note_fkId) values ('${req.body.name}','${req.body.desc}','${id}')`;
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
    if(req.body.update_name != "" & req.body.update_desc != "" & (req.body.update_state == 0 || req.body.update_state == 1)){
      let SQLquery = `update notes set note_name='${req.body.update_name}', note_desc='${req.body.update_desc}', note_state='${req.body.update_state}' where note_id='${req.body.id}'`
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
    }else{
      res.json({message:"Please fill all note requires",response:false})
    }
    
  }
  ListNotes(req, res) {
    let id = verify(req.body.token);
    let SQLquery = `select * from notes where note_fkId='${id}'`;
    if (id) {
      pool
        .query(SQLquery, (err, result, fields) => {
          res.json(result);
        })
        .on("error", (err) => {
          if (err) throw err;
        });
    }
  }
}

module.exports = notes;
