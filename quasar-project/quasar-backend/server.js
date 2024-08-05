require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser'); // Make sure you have body-parser installed
const cors = require('cors'); // Make sure you have cors installed
const statuses = require('./routes/statuses'); // Import the statuses routes

const app = express();

const port = process.env.PORT || 3001; // Use port 3001 or default to 3001 if not set
const dbURI = process.env.MONGODB_URI; // MongoDB URI from .env file
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:9000'; // Frontend origin from .env or default to localhost

// Middleware
app.use(cors({
  origin: frontendOrigin // Allow requests from this origin
}));
app.use(bodyParser.json()); // Parse JSON bodies

// Check if dbURI is loaded correctly
console.log('MONGODB_URI:', dbURI);

if (!dbURI) {
    console.error('MONGODB_URI is not defined in .env file');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB Successfully!');
        // Use the statuses routes
        app.use('/api/statuses', statuses);

        // Start the server
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
