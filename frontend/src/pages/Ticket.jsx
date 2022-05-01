import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset, closeTicket } from '../context/tickets/ticketSlice'

// Components
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { toast } from 'react-toastify'

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  )
  const params = useParams()
  const { ticketId } = params
  const { _id, status, product, description, createdAt } = ticket

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTicket(ticketId))
  }, [dispatch, ticketId])

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset())
    }

    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
  }, [dispatch, isSuccess, isError, message])

  const onCloseTicket = (e) => {
    // Confirmation window
    if (window.confirm('Are you sure you want to close this ticket?')) {
      dispatch(closeTicket(_id))
      toast.info('Ticket closed')
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>Something went wrong!</h1>
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {_id}
          <span className={`status status-${status.toLowerCase()}`}>
            {status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(createdAt).toLocaleDateString('en-US')}
        </h3>
        <h3>Product: {product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{description}</p>
        </div>
        {status !== 'Closed' && (
          <button className='btn btn-danger btn-block' onClick={onCloseTicket}>
            Close Ticket
          </button>
        )}
      </header>
    </div>
  )
}
export default Ticket
