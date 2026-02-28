const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to mock verify token
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });
    const token = authHeader.split(' ')[1];
    try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'lockedin-secret-dev-key');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

router.get('/me', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/add-xp', requireAuth, async (req, res) => {
    const { xpToAdd } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.xp += xpToAdd;
        // Basic level up logic
        if (user.xp >= 100 * user.level) {
            user.level += 1;
            user.xp = user.xp - (100 * (user.level - 1));
        }

        await user.save();
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
