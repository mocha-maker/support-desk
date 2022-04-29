import axios from 'axios'

const API_URL = '/api/tickets'

// Create a new ticket on server
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.post(API_URL, ticketData, config)

  if (response.data) {
    localStorage.setItem('ticket', JSON.stringify(response.data))
  }

  return response.data
}

const ticketService = {
  createTicket,
}

export default ticketService