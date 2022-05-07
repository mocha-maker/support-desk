import { Link, useNavigate } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function Admin() {
  const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  // Redirect if not staff
  useEffect(() => {
    !user.isStaff && navigate('/')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <section className='heading'>
        <h1>Ready to help, {user.name}?</h1>
        <p>Please choose from an option below:</p>

        <Link to='/create-ticket' className='btn btn-reverse btn-block'>
          <FaQuestionCircle />
          Create a New Ticket
        </Link>

        <Link to='/tickets' className='btn btn-block'>
          <FaTicketAlt />
          View All Tickets
        </Link>
      </section>
    </>
  )
}
export default Admin
