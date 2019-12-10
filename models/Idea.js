const mongoose = require ("mongoose");

const IdeaSchema = new mongoose.Schema ({
    title:{
        type:String,
        trim:true,
        required:[true,"please add a title"]
      },
      details:{
        type:String,
        trim:true,
        required:[true,"please add some details"]
      },
    date:{
        type:Date,
        default:Date.now
    },
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User"            //User i.e collection name created while exporting userSchema.
    }
})

module.exports = mongoose.model("Idea", IdeaSchema)