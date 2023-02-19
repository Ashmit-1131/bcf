const express = require("express");
const notesRouter = express.Router();
const { NoteModel } = require("../model/Note.Model");
const jwt = require("jsonwebtoken");

notesRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  
  jwt.verify(token, "masai", async (err, decoded) => {
    if (decoded) {
      console.log(decoded)
      try {
        const notes = await NoteModel.find({user:decoded?.userID});

        res.send(notes);
      } catch (err) {
        res.send({ msg: "Data not found" });
      }
    } else {
      res.send({ msg: "not can't be reached" });
    }
  });
});

notesRouter.post("/create", async (req, res) => {
  const payload = req.body;
  const note = new NoteModel(payload);
  await note.save();
  res.send({ msg: "created new note" });
});

notesRouter.delete("/delete/:id", async (req, res) => {
  const noteID = req.params.id;

  const note = await NoteModel.findOne({ _id: noteID });

  const user_note = note.user;
  const user_del = req.body.user;
  // console.log(user_note, "user_note");
  // console.log(user_del, "user_del");
  // console.log(note, "note");
  try {
    if (user_note !== user_del) {
      res.send({ msg: "user is not authorized" });
    } else {
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res.send({ msg: `Note with id ${noteID} has been deleted` });
    }
  } catch (err) {
    res.send({ msg: "delete route not working" });
  }
});
notesRouter.patch("/update/:id", async (req, res) => {
  const noteID = req.params.id;
  const payload = req.body;
  const note = await NoteModel.findOne({ _id: noteID });

  const user_note=note.user
  const user_del=req.body.user
  // console.log(user_note,"user_note")
  // console.log(user_del,"user_del")
  // console.log(note,"note")
  try {
    if (user_note !== user_del) {
      res.send({ msg: "user is not authorized" });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: noteID }, payload);
      res.send({ msg: `Note with id ${noteID} has been updated` });
    }
  } catch (err) {
    res.send({ msg: "update route not working" });
  }
});




module.exports = {
  notesRouter,
};
