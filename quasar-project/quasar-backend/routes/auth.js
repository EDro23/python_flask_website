const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

console.log("✅ auth.js has been loaded");
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
        console.log("🔍 Checking database for user...");
        const user = await User.findOne({ email });

        if (!user) {
            console.log("❌ User not found in database:", email);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        console.log("✅ User found in database:", user.email);

        console.log("🔑 Stored Password (Hashed):", user.password);
        console.log("🔍 Entered Password:", password);

        if (!user.password || typeof user.password !== "string") {
            console.error("❌ ERROR: User password is missing or not a string!");
            return res.status(500).json({ message: "Server error: Password format invalid" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("🔍 Password check result:", isPasswordValid);

        if (!isPasswordValid) {
            console.log("❌ Incorrect password");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (!process.env.JWT_SECRET) {
            console.error("❌ ERROR: JWT_SECRET is missing!");
            return res.status(500).json({ message: "Server error: Missing JWT secret" });
        }

        let token;
        try {
            token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            console.log("✅ Token generated:", token);
        } catch (jwtError) {
            console.error("❌ ERROR: JWT Signing failed!", jwtError);
            return res.status(500).json({ message: "Server error: JWT signing failed" });
        }

        res.json({ token });

    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ message: "Server error: An unexpected issue occurred" });
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