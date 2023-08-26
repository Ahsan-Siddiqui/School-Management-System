const mongoose = require('mongoose');

const createClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('CreateClass', createClassSchema);
