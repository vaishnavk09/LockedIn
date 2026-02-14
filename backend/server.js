const express = require("express")
const mongoose= require("mongoose")
const cors= require("cors")
const helmet = require("helmet")

require("dotenv").config()
const User = require("./src/models/User")
const connectTODB = require("./src/config/db")
const {calculateXP, calculateCoins, calculateLevel} = require('./src/utils/rewards')

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



app.get('/test-rewards', (req,res)=>{
    const xpFor25Min = calculateXP(25, 1)
    const xpFor25MinLevel10 = calculateXP(25, 10)
    const coinsFor25Min = calculateCoins(25, 1)
    const coinsFor25MinLevel10 = calculateCoins(25, 10)

    const levelAt0XP = calculateLevel(0)
    const levelAt100XP = calculateLevel(100)
    const levelAt200XP = calculateLevel(200)
    const levelAt300XP = calculateLevel(300)
    const levelAt400XP = calculateLevel(400)
    const levelAt500XP = calculateLevel(500)

    res.json({
      message: "Rewards calculation test",
      xpTests: {
        '25min_level1': xpFor25Min,
        '25min_level10': xpFor25MinLevel10,
      },
      coinTests: {
        '25min_level1': coinsFor25Min,
        '25min_level10': coinsFor25MinLevel10,
      },
      levelTests: {
        '0XP': levelAt0XP,
        '100XP': levelAt100XP,
        '200XP': levelAt200XP,
        '300XP': levelAt300XP,
        '400XP': levelAt400XP,
        '500XP': levelAt500XP,
      },
    })
}
    )

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

       