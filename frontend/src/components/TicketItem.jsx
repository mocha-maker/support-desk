import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserById } from '../context/auth/authSlice'

function TicketItem({ ticket }) {
  const { user } = useSelector((state) => state.auth)
  const [userName, setUserName] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async (id) => {
      const response = await dispatch(getUserById(id))
      setUserName(response.payload.name)
    }
    getUser(ticket.user)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='ticket' key={ticket._id}>
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status.toLocaleLowerCase()}`}>
        {ticket.status}
      </div>
      {user.isAdmin && <div>{userName}</div>}
      <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}
export default TicketItem
