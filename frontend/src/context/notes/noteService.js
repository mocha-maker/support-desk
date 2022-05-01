import axios from 'axios'

const API_URL = '/api/tickets/'

// Create a new note on server
const createNote = async (noteData, token) => {
  const ticketId = noteData.ticketId
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.post(API_URL + `${ticketId}/notes`, noteData, config)

  return response.data
}

// Get all ticket notes from the server
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.get(API_URL + `${ticketId}/notes`, config)

  return response.data
}

const ticketService = {
  createNote,
  getNotes,
}

export default ticketService