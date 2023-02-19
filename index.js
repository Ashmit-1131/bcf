const {connection}=require("./config/db")
const express=require("express")
const {userRouter}=require("./routes.js/User.route")
const {notesRouter}=require("./routes.js/Note.route")
const {authenticate}=require("./Middleware/authenticate.middleware")
const cors=require("cors")
require("dotenv").config()

const app=express()
app.use(express.json())
app.use(cors())


app.use("/homepage",(req,res)=>{
    res.send("welcome to fullstack application")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",notesRouter)
// app.use("/login",userRouter)

app.listen(process.env.port,async()=>{ 
    try{
    await connection
    console.log("connected to db")

        }
        catch{
    console.log("not connected to db")
        }
   
    console.log("server running at port 8080")
})


