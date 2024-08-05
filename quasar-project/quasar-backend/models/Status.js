const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatusSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Status', StatusSchema);
