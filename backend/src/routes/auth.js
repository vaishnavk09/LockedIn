const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// A simple demo login/register route for testing since OAuth requires client secrets
router.post('/demo-login', async (req, res) => {
    const { email, username } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                googleId: `demo-${Date.now()}`,
                email: email || 'demo@lockedin.app',
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'lockedin-secret-dev-key',
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token,
            user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

module.exports = router;
