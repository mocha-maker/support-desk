const { restart } = require('nodemon')
// User API Controller
const expressAsyncHandler = require('express-async-handler')
// Encryption module
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// Models
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// Colors
const { red } = require('colors')

// @desc Create a new ticket
// @route POST /api/tickets
// @access Private
const createTicket = expressAsyncHandler(async (req, res) => {
  const { product, description } = req.body
  
  if (!product || !description) {
    res.status(400)
    throw new Error ('Please add a product and description')
  }

  // TODO: Refactor get user function
  // Get user from JWT id
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.create({ 
    product,
    description,
    user: req.user.id,
   })

  res.status(201).json(ticket)
})

// @desc Get User tickets
// @route GET /api/tickets
// @access Private
const getTickets = expressAsyncHandler(async (req, res) => {
  // Get user from JWT id
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({ user: req.user.id })

  res.status(200).json(tickets)
})

module.exports = {
  getTickets,
  createTicket,
}