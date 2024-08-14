// routes/rooms.js
const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a room by number
router.get('/:number', async (req, res) => {
  try {
    const room = await Room.findOne({ number: req.params.number });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new room
router.post('/', async (req, res) => {
  try {
    const { number, status, primaryColor } = req.body;
    const newRoom = new Room({ number, status, primaryColor });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a room's status
router.put('/:number', async (req, res) => {
  try {
    const { status, primaryColor } = req.body;
    const room = await Room.findOneAndUpdate(
      { number: req.params.number },
      { status, primaryColor },
      { new: true }
    );
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a room
router.delete('/:number', async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ number: req.params.number });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
