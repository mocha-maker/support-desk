const express = require('express')
const router = express.Router({mergeParams: true}) // to merge ticket and notes together
const { getNotes, createNote, deleteNote } = require('../controllers/noteController')
const { protect } = require('../middleware/authMiddleware')

// Route address: "/api/tickets/:ticketId/notes/"

router.route('/')
  .get(protect, getNotes)
  .post(protect, createNote)

 router.route('/:id')
  .delete(protect, deleteNote)

module.exports = router