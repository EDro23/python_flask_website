const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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

// Get a status by ID
router.get('/:id', async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    if (!status) {
      return res.status(404).json({ error: 'Status not found' });
    }
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a status
router.put('/edit/:id', async (req, res) => {
  try {
    const updatedStatus = await Status.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a status
router.delete('/:id', async (req, res) => {
  try {
    await Status.findByIdAndDelete(req.params.id);
    res.json({ message: 'Status deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
