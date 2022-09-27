const express = require("express");
const routers = express.Router();


const UserControl = require("./controller/auth");
const user = new UserControl();

const notes = require("./controller/note");
const { verify } = require("./middleware/jwt_vality");
const note = new notes();

routers.post("/login", (req, res) => {
  console.log("passou aqui")
  user.LoginUser(req, res);
});
routers.post("/register", (req, res) => {
  user.RegisterUser(req, res);
});

routers.post("/newnote", (req, res) => {
  note.CreateNote(req, res);
});

routers.delete("/delnote", (req, res) => {
  note.DeleteNote(req, res);
});

routers.post("/modnote", (req, res) => {
  note.UpdataNote(req, res);
});
routers.post("/listnotes", (req, res) => {
  note.ListNotes(req, res);
  
});
module.exports = routers;
