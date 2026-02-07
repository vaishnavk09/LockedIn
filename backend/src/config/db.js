const mongoose= require("mongoose")
require("dotenv").config()
const connectToDB  =async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("database connected successfully")
    }catch(error)
    {
        console.error("Error connecting to database:", error)
        process.exit(1)
    }
    }

    module.exports= connectToDB