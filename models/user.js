const mongoose = require("mongoose")
const validator = require("validator")
const uniqueValidator=require("mongoose-unique-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:true,
        trim:true
      },
    gmail:{
      type:String,
      unique:[true,"Enter a unique email"],
      required:true,
      trim:true,
      lowercase:true,
      validate(value){
        if(!validator.isEmail(value))
      {
        throw new Error ("Enter a valid email ")
      }
      }
    },
    password:{
      type:String,
      trim:true,
      validate(value){
        if(value.length<6)
        {
          throw new Error ("password should be of more than 6 digit")
        }
      },
      required:true,
      select:false
    },
})

//Virtual propert for relationship b/w user and idea now in each user data there will be array of its ideas too.
UserSchema.virtual("ideas",{
  ref:"Idea",
  localField:"_id",
  foreignField:"owner",
  justOne:false
})


//encrypt password
UserSchema.pre("save",async function(next){
  const salt =  await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})

// sign jwt and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
  })
}

//match user entered password
UserSchema.methods.matchPassword = async function(enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password)
}


UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User",UserSchema)