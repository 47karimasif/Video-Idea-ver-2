const path=require("path");
const express = require("express");
const dotenv =  require("dotenv");
const methodoverride=require("method-override")
const cookieParser = require ("cookie-parser")
const hbs = require("hbs")
const connectDB= require("./config/db")

dotenv.config({path: "./config/config.env" });
const app = express();

//connecting to database
connectDB();

//setting up PUBLIC directory
const publicdirectorypath=path.join(__dirname,"/PUBLIC")
app.use(express.static(publicdirectorypath));

// setting up view engine
const viewspath=path.join(__dirname,"/templates/views");
app.set("views",viewspath)

const partialPath=path.join(__dirname,"/templates/partials")
hbs.registerPartials(partialPath)

app.set('view engine',"hbs");

//parsing form data
app.use(express.urlencoded({extended: true}))

//middleware for put request
app.use(methodoverride("_method"));

//cookieParser for token
app.use(cookieParser());



// Route files
const home = require("./routes/home")
const idea = require("./routes/idea")
const user= require("./routes/user")

// Global user variables
app.use((req,res,next)=>{
    if(req.cookies.token)
    {
    res.locals.user="Logged-in"
    }
    next()
})

//mount routers
app.use("/video-idea/v1",home);
app.use("/video-idea/v1/ideas",idea);
app.use("/video-idea/v1",user);  




//for any route that doesn't exists
app.get("*",(req,res)=>{
    res.render("wrong-route")
})
const PORT = process.env.PORT || 8000;
app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} mode on Port ${PORT}`))

 