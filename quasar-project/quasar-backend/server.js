// server.js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const statuses = require('./routes/statuses');
const auth = require('./routes/auth');
const rooms = require('./routes/rooms');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN || ['http://localhost:9000', 'http://<192.168.2.32>:9000'],
  },
});

const port = process.env.PORT || 3001;
const dbURI = process.env.MONGODB_URI;
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:9000';

// Middleware
app.use(cors({ origin: frontendOrigin }));
app.use(bodyParser.json());

if (!dbURI) {
  console.error('MONGODB_URI is not defined in .env file');
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB Successfully!');
    app.use('/api/statuses', statuses(io));  // Pass io to statuses route
    app.use('/api/auth', auth);
    app.use('/api/rooms', rooms);

    // Start the server
    httpServer.listen(port, '0.0.0.0', () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// WebSocket setup
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

module.exports = io;
