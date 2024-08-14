const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  number: {
    type: String, // Changed from Number to String
    required: true
  },
  primaryColor: {
    type: String,
    required: true
  },
  status: {
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('Room', RoomSchema);
