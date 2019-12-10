const express=require("express");
const { createIdeapage,postIdea,userIdeas,myIdeas,updateIdeapage,saveupdatedIdea,deleteIdea}=require("../controllers/idea")
const router=express.Router();
const auth = require ("../middleware/auth")
router
.route("/")
.get(userIdeas)
.post(auth,postIdea)

router
.route("/add-ideas")
.get(auth,createIdeapage)

router
.route("/my-ideas")
.get(auth,myIdeas)

router
.route("/edit/:id")
.get(auth,updateIdeapage)
.put(auth,saveupdatedIdea)

router
.route("/delete/:id")
.delete(auth,deleteIdea)


module.exports = router;

