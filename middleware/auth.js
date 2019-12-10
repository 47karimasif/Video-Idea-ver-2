const jwt = require ("jsonwebtoken")
const User = require ("../models/user")

const auth = async(req,res,next) => {
    const token=req.cookies.token
    if(!token)
    {
        return res.redirect("/video-idea/v1/login")
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id);
        next()
    }
    catch(err)
    {
        console.log(err)
        res.redirect("/video-idea/v1/login")
    }
}

module.exports = auth;