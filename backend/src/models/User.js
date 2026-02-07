const mongoose = require("mongoose")


const userSchema = new mongoose.Schema(
    {
        googleId:{
            type:String,
            required:true,
            unique:true
        },

        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,

        },
        avatar:{
            type:String,
            default:"https://api.dicebear.com/7.x/avataaars/svg?seed=default"
        },
        xp:{
            type:Number,
            default: 0,
            min: 0,

        },
        level:{
            type:Number,
            default: 1,
            min: 1,
        },
        coins:{
            type:Number,
            default: 0,
            },

    },
    {
        timestamps:true
    }
)

const User = mongoose.model('User', userSchema)
module.exports= User