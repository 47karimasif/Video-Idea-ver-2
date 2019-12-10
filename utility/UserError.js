
const errormessage = (error)=>{
    const errorArr= Object.values(error.errors);
    const errormsg=[]
    errorArr.forEach((val)=>{
        if(val.properties.type==="unique")
        {
            errormsg.push("gmail already exists")
        }
        else{
            errormsg.push(val.message)
        }
    })
    return errormsg;
}


module.exports = errormessage