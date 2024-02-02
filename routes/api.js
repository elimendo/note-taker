const router = require('express').Router();
const {getNotes, writeNote, deleteNote} = require("../db/store")

router.get("/notes", (req, res)=> {
res.json(getNotes())
})




module.exports = router