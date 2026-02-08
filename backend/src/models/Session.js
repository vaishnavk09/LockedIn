const mongoose = require("mongoose")
const sessionSchema = mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    duration:{
        type: Number,
         required: true,
         min: 1,
         max: 120,
    },
     actualDuration: {
      type: Number,
      default: 0,
      min: 0,
    },
    
    status: {
      type: String,
      enum: ['active', 'completed', 'abandoned'],
      default: 'active',
      required: true,
    },
    
    xpEarned: {
      type: Number,
      default: 0,
      min: 0,
    },
    
    coinsEarned: {
      type: Number,
      default: 0,
      min: 0,
    },
    
    startedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Auto-generates createdAt and updatedAt
  }

)

sessionSchema.index({
    userId: 1, createdAt: -1
})

const Session= mongoose.model("Session",sessionSchema)

module.exports = Session