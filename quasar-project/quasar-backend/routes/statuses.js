const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Status = require('../models/Status');

// Get a status by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('Invalid ID format');
    }
    const status = await Status.findById(id);
    if (!status) {
      return res.status(404).send('Status not found');
    }
    res.json(status);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

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

// Delete a status by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Status.findByIdAndDelete(id);
    res.status(200).json({ message: 'Status deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
