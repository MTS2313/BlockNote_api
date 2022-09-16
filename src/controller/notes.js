const jwt = require("jsonwebtoken");
const InsertNote = require("../Interface/DbCreateNote");
const DeleteNote = require("../Interface/DbDeleteNote");
const GetNotes = require("../Interface/DbGetNotes");
const UpdateNote = require("../Interface/DbUpdateNote");
class NoteControl {
  constructor(token,desc,noteid,notestts) {
    this.KeyTK = token;
    this.NoteId = noteid;
    this.Content = desc;
    this.NoteState = notestts
  }
  KeyVerify(token) {
    let IdUser
    const DecodedToken = jwt.verify(token, process.env.SECRET);
    IdUser = DecodedToken.IdUser;
    return IdUser;
  }
 CreateNote(token = this.KeyTK, content = this.Content) {
    const id = this.KeyVerify(token);
    return  id ? InsertNote(id,content) : console.log("id nao existente");
  }
  async DeleteNote(token = this.KeyTK, Nid = this.NoteId){
    let resp
    const id = this.KeyVerify(token);
    await DeleteNote(id,Nid).then(i=>{
      if(i === 1){
        resp = {message:"Note delete"}
      }else{
        resp = {message:"Erro na api"}
      }
    })
    return resp
  }
  async GetNotes(token = this.KeyTK){
    const id = this.KeyVerify(token);
    return await GetNotes(id)
  }
  async UpDataNote(token = this.KeyTK,NewDesc = this.Content, Nid = this.NoteId){    
    const id = this.KeyVerify(token)
    let resp 
   return await UpdateNote(NewDesc,Nid,id).then(i=>i===1 ? resp = {menssage:"Nota atualizada"} : resp = {menssage:"Erro a o atualizar Nota"})
  }
}

module.exports = NoteControl;
