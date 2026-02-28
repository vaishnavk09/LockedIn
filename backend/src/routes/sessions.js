const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Session = require('../models/Session')
const {calculateXP, calculateCoins, calculateLevel} = require('../utils/rewards')


router.post('/start', async(req,res)=>{
    try{
    const {userId, duration} = req.body

    if(!userId || !duration){
        return res.status(400).json({
            success:false,
            message:"userId and duration are required"

        })
    }
    if(duration <1 || duration >120){
        return res.status(400).json({
            success:false,
            message:"duration must be between 1 and 120 minutes"
    })
    }
    const user = await User.findById(userId)
    if(!user){
        return res.status(400).json({
            success:false,
            message:"user not found"
        })
    }

     const session = await Session.create({
      userId,
      duration,
      status: 'active',
    });

    res.status(201).json({
      success: true,
      message: 'Focus session started! 🎯',
      data: {
        session,
      },
    });
  } catch (error) {
    console.error('Error starting session:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});
    
router.patch('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the session
    const session = await Session.findById(id);
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found',
      });
    }

    if (session.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Session is not active',
      });
    }

    // Calculate actual duration
    const now = new Date();
    const actualDuration = Math.floor((now - session.startedAt) / 1000 / 60); // minutes

    // Get user for level calculation
    const user = await User.findById(session.userId);

    // Calculate rewards
    const xpEarned = calculateXP(actualDuration, user.level);
    const coinsEarned = calculateCoins(actualDuration, user.level);

    // Update session
    session.status = 'completed';
    session.actualDuration = actualDuration;
    session.completedAt = now;
    session.xpEarned = xpEarned;
    session.coinsEarned = coinsEarned;
    await session.save();

    // Update user
    user.xp += xpEarned;
    user.coins += coinsEarned;
    user.level = calculateLevel(user.xp);
    await user.save();

    res.json({
      success: true,
      message: 'Session completed! 🎉',
      data: {
        session,
        rewards: {
          xpEarned,
          coinsEarned,
        },
        user: {
          totalXP: user.xp,
          level: user.level,
          coins: user.coins,
        },
      },
    });
  } catch (error) {
    console.error('Error completing session:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

// @route   GET /api/sessions/user/:userId
// @desc    Get all sessions for a user
// @access  Public (will add auth later)
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const sessions = await Session.find({ userId })
      .sort({ createdAt: -1 }) // Newest first
      .limit(20); // Last 20 sessions

    res.json({
      success: true,
      data: {
        sessions,
        count: sessions.length,
      },
    });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

module.exports = router;