const express = require("express");
const routers = express.Router();

const UserControl = require("./controller/auth");
const user = new UserControl();

const NoteControl = require("./controller/notes")
const notes = new NoteControl();

routers.post("/login", (req, res) => {
  user.login(req.body.name, req.body.password).then((resp) => res.json(resp));
});

routers.post("/valid", (req, res) => {
  const Verifyresp = user.verify(req.body.token);
  res.json(Verifyresp);
});
routers.post("/register", (req, res) => {
  user.register(req.body.user, req.body.password).then(resp =>{
    res.json(resp)
  })
});

routers.post("/create_note",(req,res) => {
  notes.CreateNote(req.body.token,req.body.content)
  res.json({"menssage":"Note add"})
})
routers.delete("/deletenote",(req,res)=>{
  notes.DeleteNote(req.body.token, req.body.id).then(resp=>{
    res.json(resp)
  })
})
routers.post("/listnote",(req,res)=>{
  notes.GetNotes(req.body.token).then(resp => res.json({NotesList:resp}))
})
routers.put("/updatenote", (req,res)=>{
  notes.UpDataNote(req.body.token,req.body.content,req.body.id).then(resp => res.json(resp))
})
module.exports = routers;