// routes/statuses.js
const express = require('express');
const router = express.Router();
const Status = require('../models/Status');

// Add a new status
router.post('/add', async (req, res) => {
  try {
    const { name, text, color } = req.body;
    const newStatus = new Status({ name, text, color });
    await newStatus.save();
    res.status(201).json(newStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all statuses
router.get('/', async (req, res) => {
  try {
    const statuses = await Status.find();
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a status
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, text, color } = req.body;
    const updatedStatus = await Status.findByIdAndUpdate(
      id,
      { name, text, color },
      { new: true }
    );
    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
