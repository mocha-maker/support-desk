import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset, closeTicket } from '../context/tickets/ticketSlice'
import { getNotes, createNote } from '../context/notes/noteSlice'

// Components
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { toast } from 'react-toastify'
import NoteItem from '../components/NoteItem'
import { FaPlus } from 'react-icons/fa'

const customStyles = {
  content: {
    width: 600,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#root')

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteContent, setNoteContent] = useState('')

  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  )
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  )

  const params = useParams()
  const { ticketId } = params
  const { _id, status, product, description, createdAt } = ticket

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
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

  // Open/Close Modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  const onCreateNote = (e) => {
    e.preventDefault()
    dispatch(createNote({ ticketId, noteContent }))
    closeModal()
  }

  if (isLoading || notesIsLoading) {
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
          <span className={`status status-${status}`}>{status}</span>
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
      </header>
      <h2>Notes</h2>

      {notes.length > 0 ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <h1>No notes yet.</h1>
      )}

      {status !== 'Closed' && (
        <>
          <button className='btn' onClick={openModal}>
            <FaPlus />
            Add Note
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel='Add Note'
          >
            <h2>Add a New Note</h2>
            <button onClick={closeModal} className='btn-close'>
              x
            </button>
            <form onSubmit={onCreateNote}>
              <div className='form-group'>
                <textarea
                  name='noteContent'
                  id='noteContent'
                  type='text'
                  className='form-control'
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder='Type note here...'
                  required
                />
              </div>
              <button className='btn'>Add Note</button>
            </form>
          </Modal>
          <button className='btn btn-danger btn-block' onClick={onCloseTicket}>
            Close Ticket
          </button>
        </>
      )}
    </div>
  )
}
export default Ticket
