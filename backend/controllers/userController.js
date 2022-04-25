// User API Controller

// Register a new user
const registerUser = (req, res) => {
  res.send('Register Route')
}

// Login an existing user
const loginUser = (req, res) => {
  res.send('Login Route')
}

module.exports = {
  registerUser,
  loginUser
}