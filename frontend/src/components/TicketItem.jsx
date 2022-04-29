import { Link } from 'react-router-dom'

function TicketItem({ ticket }) {
  return (
    <div className='ticket' key={ticket._id}>
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status.toLowerCase()}`}>
        {ticket.status}
      </div>
      <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}
export default TicketItem
