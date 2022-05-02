// User API Controller
const expressAsyncHandler = require('express-async-handler')

// Models
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

// @desc Create a new note
// @route POST /api/tickets/:ticketId/notes/
// @access Private
const createNote = expressAsyncHandler(async (req, res) => {
  const { content } = req.body
  
  if (!content) {
    res.status(400)
    throw new Error ('Please add note content')
  }

  // TODO: Refactor get user function
  // Get user from JWT id
  const user = await User.findById(req.user.id)

  // Get ticket from params
  const ticket = await Ticket.findById(req.params.ticketId)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const note = await Note.create({ 
    content,
    user: req.user.id,
    ticket: req.params.ticketId,
    isStaff: false,
   })

  res.status(201).json(note)
})

// @desc Get Notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = expressAsyncHandler(async (req, res) => {
  // Get user from JWT id
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  // Check if user owns ticket
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const notes = await Note.find({ticket: req.params.ticketId})

  res.status(200).json(notes)
})

// @desc Delete a note
// @route DELETE /api/tickets/:ticketId/notes/:id
// @access Private
const deleteNote = expressAsyncHandler(async (req, res) => {
  // Get user from JWT id
  const user = await User.findById(req.user.id)

  // Check if logged in
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)
  
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  // Check if user owns ticket
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const note = await Note.findById(req.params.id)

  if (!note) {
    res.status(404)
    throw new Error('Note not found')
  }

  // Delete ticket
  await note.remove()

  res.status(200).json({success: true})
})

module.exports = {
  createNote,
  getNotes,
  // getNote,
  // updateNote,
  deleteNote,
}