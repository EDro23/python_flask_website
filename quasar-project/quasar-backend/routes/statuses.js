const express = require('express');
const router = express.Router();
const Status = require('../models/Status');

// Get all statuses
router.get('/', async (req, res) => {
  try {
    const statuses = await Status.find();
    res.json(statuses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new status
router.post('/', async (req, res) => {
  const status = new Status({
    name: req.body.name,
    text: req.body.text,
    color: req.body.color
  });

  try {
    const newStatus = await status.save();
    res.status(201).json(newStatus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a status
router.delete('/:id', async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    if (!status) throw new Error('Status not found');
    await status.remove();
    res.json({ message: 'Status deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
