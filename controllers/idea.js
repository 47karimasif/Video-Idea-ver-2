const Idea=require("../models/Idea")
const User=require("../models/user")
const Errormsg=require("../utility/IdeaError")
// fetch idea creating page
exports.createIdeapage = (req,res,next)=>{
    res.render("idea/add-ideas")
}

// post Idea
exports.postIdea = async (req,res,next)=>{
    req.body.owner=req.user.id;                     //owner is the one who is creating that post.
    try{
        const newIdea = await Idea.create(req.body)
        res.redirect("/video-idea/v1/ideas")
    }
    catch(err){
        const errormsg=Errormsg(err)
        res.render("idea/add-ideas",{
            errors:errormsg
        })       
    }
}

//fetch All User Idea
exports.userIdeas = async(req,res,next)=>{
    try{
        const userideas = await Idea.find({}).populate("owner").sort({date:"desc"}) //for populating ideas with owner informations.
        // console.log(userideas[0].owner.name) it will the info about user who created it.
        res.render("allideas",{
            allideas:userideas
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

// fetch my ideas with edit and delete option
exports.myIdeas = async(req,res,next)=>{
    try{
        // const myideas = await Idea.find({owner:req.user._id}).sort({date:"desc"})
        const user=await User.findById({_id:req.user._id}) //here we are reverse populating the user with all idea he created virtually using virtual schema we created in user model
        await user.populate("ideas").execPopulate()
        res.render("idea/myideas",{
            ideas:user.ideas
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

// fetch update idea page
exports.updateIdeapage  = async (req,res,next)=>{
    try{
        const _id=req.params.id
        const idea=await Idea.findById(_id)
        res.render("idea/edit-idea",{
            idea
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

//post update the idea

exports.saveupdatedIdea = async (req,res,next)=>{
    try{
        await Idea.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.redirect("/video-idea/v1/ideas/my-ideas")
    }
    catch(err)
    {
        console.log(err)
    }
}

// delete an idea
exports.deleteIdea = async(req,res,next)=>{
    try{
        await Idea.findByIdAndDelete(req.params.id)
        res.redirect("/video-idea/v1/ideas/my-ideas")
    }
    catch(err)
    {
        console.log(err)
    }
}