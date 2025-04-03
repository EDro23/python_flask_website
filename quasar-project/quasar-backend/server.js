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
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

const port = process.env.PORT || 3001;
const dbURI = process.env.MONGODB_URI;

console.log("🔍 MongoDB URI:", dbURI);

// ✅ Updated CORS Middleware
app.use(cors({
  origin: function (origin, callback) {
    console.log('🛰️ Incoming CORS request from origin:', origin || 'null (no origin)');
    const allowedOrigins = [
      'http://localhost:9000',
      'http://127.0.0.1:8080',
      'http://192.168.2.32:8080',
      'capacitor://localhost',
      'http://localhost',
      'https://quasar-status-app.onrender.com'
    ];
    if (!origin || allowedOrigins.includes(origin) || origin === 'null') {
      callback(null, true);
    } else {
      console.log('❌ Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`🔍 Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// Debug Route
app.get('/test-api', (req, res) => {
  console.log("✅ Received request at /test-api");
  res.json({ message: "API is working!" });
});

// Log all routes before DB connection
console.log("🔍 Checking registered routes BEFORE MongoDB connection...");
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`✅ Registered route: ${r.route.path}`);
  }
});

if (!dbURI) {
  console.error('❌ ERROR: MONGODB_URI is not defined in .env file');
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(dbURI)
  .then(() => {
    console.log('✅ Connected to MongoDB Successfully!');
    
    console.log("🔍 Loading routes...");
    app.use('/api/statuses', statuses(io));
    app.use('/api/auth', auth);
    app.use('/api/rooms', rooms);
    console.log("✅ Routes loaded successfully!");

    // Log routes after loading
    console.log("🔍 Checking registered routes AFTER MongoDB connection...");
    app._router.stack.forEach((r) => {
      if (r.route && r.route.path) {
        console.log(`✅ Registered route: ${r.route.path}`);
      }
    });

    httpServer.listen(port, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// WebSocket setup
io.on('connection', (socket) => {
  console.log('⚡️ Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('⚡️ Client disconnected:', socket.id);
  });
});

module.exports = io;
