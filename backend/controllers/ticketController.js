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

// @desc Get User tickets
// @route GET /api/tickets
// @access Private
const getTickets = expressAsyncHandler(async (req, res) => {

  res.status(200).json({message: 'getTickets'})
})

// @desc Create a new ticket
// @route POST /api/tickets
// @access Private
const createTicket = expressAsyncHandler(async (req, res) => {

  res.status(201).json({message: 'createTicket'})
})

module.exports = {
  getTickets,
  createTicket,
}