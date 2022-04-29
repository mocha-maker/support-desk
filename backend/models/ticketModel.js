const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Object reference see database collection name
  },
  product: {
    type: String,
    required: [true, 'Please select a Product'],
    enum: ['Gotway MSP', 'InMotion V11', 'Veteran Sherman']
  },
  description: {
    type: String,
    required: [true, 'Please enter a description of the issue'],
  },
  status: {
    type: String,
    required: true,
    enum: ['New', 'Open', 'Escalated', 'Closed'],
    default: 'New',
  },
  solution: {
    type: String,
    required: false,
  },
},
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Ticket', ticketSchema)