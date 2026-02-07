const express = require("express")
const mongoose= require("mongoose")
const cors= require("cors")
const helmet = require("helmet")

require("dotenv").config()
const User = require("./src/models/User")
const connectTODB = require("./src/config/db")
const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())



app.get('/',(req,res)=>{
    res.send("LOCKED IN API is running...")
})


app.get('/test-user',async (req,res)=>{
    try{
        const testUser = await User.create(
            {
                googleId:"123456789",
                email:'test@test.com',
                username:'testuser',

            }
        )
        res.json({
            message:"User created successfully",
            user:testUser,
        })
    }catch(error)
    {
        res.status(500).json({
            message:"Err creating User",
            error: error.message,
        })
    }
})


const PORT = process.env.PORT || 5000

const startServer = async () =>{
    try{
        await connectTODB()

        app.listen(PORT, ()=>{
            console.log(`server running on port ${PORT} ` )
            console.log(`http://localhost:${PORT}`)
            })
    }catch(error){
        console.error("Error starting server:", error)
    }
}

startServer()

       