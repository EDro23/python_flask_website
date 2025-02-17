const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Debug log to confirm auth.js is being loaded
console.log("✅ auth.js has been loaded");

// Debug log for JWT Secret
console.log("🔑 JWT_SECRET:", process.env.JWT_SECRET);

// Debug Route to Check If Auth Is Working
router.get('/test-auth', (req, res) => {
    console.log("✅ /api/auth/test-auth route was hit!");
    res.json({ message: "Auth route is working!" });
});

// Login Route
router.post('/login', async (req, res) => {
    console.log("🔍 Login request received!");
    console.log("📨 Request Body:", req.body);

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log("❌ User not found:", email);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        console.log("✅ User found:", user.email);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("🔍 Password check result:", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("✅ Token generated:", token);

        res.json({ token });

    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Debugging: Log all registered routes in auth.js
console.log("🔍 Registered routes in auth.js:");
router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`✅ Registered route in auth.js: /api/auth${r.route.path}`);
    }
});

module.exports = router;
