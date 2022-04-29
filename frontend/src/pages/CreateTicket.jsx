// Utilities
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createTicket, reset } from '../context/tickets/ticketSlice'

// Components
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function CreateTicket() {
  const { user } = useSelector((state) => state.auth)
  const [name] = useState(user.name)
  const [email] = useState(user.email)

  const [product, setProduct] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // get ticket context
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect on successful ticket creation
    if (isSuccess) {
      toast.success('New Ticket Created')
      navigate('/tickets')
    }

    dispatch(reset())
  }, [isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(
      createTicket({
        product,
        description,
      })
    )
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h2>Create New Ticket</h2>
        <p>Please fill out the form below:</p>
      </section>
      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              defaultValue=''
              onChange={(e) => setProduct(e.target.value)}
              required
            >
              <option value=''>Please select a product</option>
              <option value='Gotway MSP'>Gotway MSP</option>
              <option value='InMotion V11'>InMotion V11</option>
              <option value='Veteran Sherman'>Veteran Sherman</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description of issue</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='E.g. flat wheel, dead battery, upgrade pedals'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button className='btn btn-block'>Create Ticket</button>
        </form>
      </section>
    </>
  )
}
export default CreateTicket
