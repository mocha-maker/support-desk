const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Please add note content'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Object reference see database collection name
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Ticket', // Object reference see database collection name
  },
  isStaff: {
    type: Boolean,
    default: false,
  }
},
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Note', noteSchema)