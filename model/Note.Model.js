const mongoose=require("mongoose")

noteSchema=mongoose.Schema({
    title:String,
    body:String,
    user:String,
  
    
})

const NoteModel=mongoose.model("note",noteSchema)


module.exports={
   NoteModel
}