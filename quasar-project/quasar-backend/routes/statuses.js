// statuses.js
const express = require('express');
const mongoose = require('mongoose');
const Status = require('../models/Status');

module.exports = (io) => {
  const router = express.Router();

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
  router.put('/:id', async (req, res) => {
    try {
      const updatedStatus = await Status.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (io) {
        io.emit('statusUpdated', updatedStatus);
      }
      res.json(updatedStatus);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete a status
  router.delete('/:id', async (req, res) => {
    try {
      const deletedStatus = await Status.findByIdAndDelete(req.params.id);
      if (io) {
        io.emit('statusDeleted', deletedStatus);
      }
      res.json({ message: 'Status deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
