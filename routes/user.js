const express=require("express")
const {Signuppage,Usersignup,Loginpage ,Userlogin,Logout,Profilepage,Aboutpage} = require("../controllers/user")
const router = express.Router()
const auth = require ("../middleware/auth")

router
.route("/signup")
.get(Signuppage)
.post(Usersignup)

router
.route("/login")
.get(Loginpage)
.post(Userlogin)
 

router
.route("/logout")
.get(auth,Logout)

router
.route("/profile")
.get(auth,Profilepage)

router
.route("/about")
.get(Aboutpage)


module.exports = router