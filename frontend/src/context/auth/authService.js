import axios from 'axios'

const API_URL = '/api/users/'

// Register user to server
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user to server
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Get user data from server
const getUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + userId, config)
  return response.data
}

// Logout user from localstorage
const logout = () => localStorage.removeItem('user')

const authService = {
  register,
  login,
  logout,
  getUser,
}

export default authService