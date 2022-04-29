// Utilities
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../context/auth/authSlice'

// Components
import { FaSignInAlt, FaEye } from 'react-icons/fa'
import { toast } from 'react-toastify'

function Login() {
  // State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false)

  // destructure formData
  const { email, password } = formData

  const dispatch = useDispatch()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    // Validate credentials
    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
      </section>
      <p>Please login to get support.</p>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter your password'
              required
              autoComplete='current-password'
            />
            <FaEye
              alt='show password'
              className='password-visibility-icon'
              size={50}
              style={showPassword ? { opacity: '1' } : { opacity: '0.5' }}
              onClick={(e) => {
                setShowPassword((prevState) => !prevState)
              }}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Sign In</button>
          </div>
        </form>
      </section>
    </>
  )
}
export default Login
