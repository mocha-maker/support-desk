import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset } from '../context/tickets/ticketSlice'

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
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status.toLowerCase()}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted:{' '}
          {new Date(ticket.createdAt).toLocaleDateString('en-US')}
        </h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
    </div>
  )
}
export default Ticket
