// Utilities
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../context/auth/authSlice'

// Components
import { FaUser, FaEye } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Register() {
  // State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  // destructure formData
  const { name, email, password, password2 } = formData

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

    // Redirect on successful registration or is logged in
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  // Update state on form data entry
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // Register User on Submit
  const onSubmit = (e) => {
    e.preventDefault()

    // Validate password match
    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
      </section>
      <p>Please create an account.</p>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your name'
              required
            />
          </div>
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
              autoComplete='new-password'
            />
            <FaEye
              alt='show password'
              className='password-visibility-icon'
              size={50}
              style={showPassword ? { opacity: '1' } : { opacity: '0.3' }}
              onClick={(e) => {
                setShowPassword((prevState) => !prevState)
              }}
            />
          </div>
          <div className='form-group'>
            <input
              type={showPassword2 ? 'text' : 'password'}
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Enter your password again'
              required
              autoComplete='new-password'
            />
            <FaEye
              alt='show password'
              className='password-visibility-icon'
              size={50}
              style={showPassword2 ? { opacity: '1' } : { opacity: '0.3' }}
              onClick={(e) => {
                setShowPassword2((prevState) => !prevState)
              }}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
export default Register
