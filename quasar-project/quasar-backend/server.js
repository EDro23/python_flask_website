require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const port = process.env.PORT || 3001; // Use port 3001 or default to 3001 if not set
const dbURI = process.env.MONGODB_URI; // MongoDB URI from .env file

// Check if dbURI is loaded correctly
console.log('MONGODB_URI:', dbURI); // Add this line for debugging

if (!dbURI) {
    console.error('MONGODB_URI is not defined in .env file');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
