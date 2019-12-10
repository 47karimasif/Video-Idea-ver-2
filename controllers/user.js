const User = require("../models/user")
const UserError = require ("../utility/UserError")
exports.Signuppage = async (req,res,next)=>{
    res.render("signup")
}

exports.Usersignup = async (req,res,next)=>{
    try{
        const newuser = await User.create({
            ...req.body
        })

    //create token
    // const token = newuser.getSignedJwtToken()
    // console.log(token)

    res.redirect("/video-idea/v1/login")
    }
    catch(err)
    {
        const errormsg = UserError(err)
        res.render("signup",{
            errors:errormsg
        })
    }
}

exports.Loginpage = async (req,res,next)=>{
    res.render("login")
}

exports.Userlogin = async (req,res,next)=>{
    try{
        const {gmail,password}=req.body
        //validate email and password
        if(!gmail || !password)
        {
           return  res.render("login",{
                errors:["please provide gmail and password"]
            })
        }
        //check for user found or not
        const user=await User.findOne({gmail:gmail}).select("+password")

        if(!user) {
            return res.render("login",{
                errors:["invalid credentials"]
            })
        }

        //check if password matches
        const isMatch = await user.matchPassword(password)
        if(!isMatch)
        {
           return res.render("login",{
                errors:["invalid credentials"]
            })
        }
        //create and send token in res to browser
        sendTokenResponse(user,res)
        res.redirect("/video-idea/v1/profile")
    }catch(err)
    {
        console.log(err)
    }
}

exports.Logout = async(req,res,next) => {
    try{
        res.cookie("token","none",{
            expires: new Date(Date.now()+1*10),
            httpOnly:true
        })
        res.redirect("/video-idea/v1")
    } catch(err)
    {
        console.log(err)
    }
}

exports.Profilepage = async (req,res,next) => {
    try{
        res.render("profile",{
            user:req.user
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

exports.Aboutpage = async (req,res,next) => {
    try{
        res.render("about")
    }
    catch(err)
    {
        console.log(err)
    }
}

//get token from model,create cookie and send response

const sendTokenResponse = (user,res) =>{
    const token = user.getSignedJwtToken();
    const options = {
        expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE *24*60*60*1000),
        httpOnly:true,
        secure = true;
    };
    
    res.cookie("token",token,options)
}


