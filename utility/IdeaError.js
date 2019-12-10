
const errormessages=(error)=>{
    let errormsg;
    if(error.code==11000)
    {
        errormsg=["Idea already exists"];
        return errormsg
    }
    else{
        errormsg = Object.values(error.errors).map(val =>val.message)
        return errormsg
    }
    
  }
  
  module.exports=errormessages