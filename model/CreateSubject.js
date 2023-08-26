const mongoose = require('mongoose');

const createSubjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('CreateSubject', createSubjectSchema);
