import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, reset, clear } from '../context/tickets/ticketSlice'

// Components
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { toast } from 'react-toastify'
import TicketItem from '../components/TicketItem'

function Tickets() {
  const { user } = useSelector((state) => state.auth)
  const { tickets, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clear())
    dispatch(getTickets())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h2>Tickets</h2>
        <p>Your tickets dashboard.</p>
      </section>
      <section className='tickets'></section>

      {tickets.length > 0 ? (
        <>
          <div className='ticket-headings'>
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            {user.isAdmin && <div>Customer</div>}
            <div></div>
          </div>
          {tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket}></TicketItem>
          ))}
        </>
      ) : (
        <div>
          You have no tickets! First{' '}
          <a href='/create-ticket'>create a new ticket</a>.
        </div>
      )}
    </>
  )
}
export default Tickets
