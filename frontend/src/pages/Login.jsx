// Utilities
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../context/auth/authSlice'

// Components
import { FaSignInAlt, FaEye } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

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
  const navigate = useNavigate()

  // get auth context
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect on successful login
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

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

  if (isLoading) {
    return <Spinner />
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
