const { restart } = require('nodemon')
// User API Controller
const expressAsyncHandler = require('express-async-handler')
// Encryption module
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// User Model
const User = require('../models/userModel')

// Colors
const { red } = require('colors')

// @desc Register a new user
// @route /api/users
// @access Public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({email})

  if(userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password with bcrypt
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hashSync(password, salt)

  // Create a new user
  const user = await User.create({
    name, 
    email, 
    password: hashedPassword
  })

  // Generate server response
  if(user) {
    // 201 Created
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new error('Invalid user data')
  }
})

// @desc Login a  user
// @route /api/users/login
// @access Public
const loginUser = expressAsyncHandler(async (req, res) => {

  // Get email and password from request
  const { email, password } = req.body

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hashSync(password, salt)
  console.log(hashedPassword);

  // Check if user email exists in database
  const user = await User.findOne({email})

  // Compare user & password entered with the one in the db
  if( user && (await bcrypt.compareSync(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid Credentials')
  }
})

// @desc Retrieve user information
// @route /api/users/me
// @access Private
const getMe = expressAsyncHandler(async (req, res) => {
  // Deconstruct user model
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  }
  res.status(200).json(user)
})

// Generate a JSON token
const generateToken = (id) => {
  return jwt.sign(
    { id }, 
    process.env.JWT_SECRET, 
    { expiresIn: '30d'})
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}