require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const Room = require('./models/Room'); // Import the Room model

const dbURI = process.env.MONGODB_URI; // MongoDB URI from .env file

// Connect to MongoDB
mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB Successfully!');
        addInitialRooms();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

const rooms = [
  { number: 'room-1', primaryColor: '#ffffff', status: { text: 'Available', color: '#00ff00' } },
  { number: 'room-2', primaryColor: '#ffffff', status: { text: 'Occupied', color: '#ff0000' } },
  { number: 'room-3', primaryColor: '#ffffff', status: { text: 'Cleaning', color: '#ffff00' } },
  { number: 'room-4', primaryColor: '#ffffff', status: { text: 'Maintenance', color: '#0000ff' } },
  { number: 'room-5', primaryColor: '#ffffff', status: { text: 'Closed', color: '#888888' } },
];

async function addInitialRooms() {
  try {
    await Room.deleteMany(); // Remove existing rooms if any
    await Room.insertMany(rooms);
    console.log('Initial rooms added successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error adding initial rooms:', error);
  }
}
