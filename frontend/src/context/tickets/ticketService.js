import axios from 'axios'

const API_URL = '/api/tickets/'

// Create a new ticket on server
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.post(API_URL, ticketData, config)

  return response.data
}

// Close a ticket on the server -- changes kept in service to keep UI secure
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.put(API_URL + ticketId, {status: 'Closed'}, config)

  return response.data
}

// Get all user's tickets from the server
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

// Get a ticket from the server
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.get(API_URL + ticketId, config)

  return response.data
}

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket
}

export default ticketService