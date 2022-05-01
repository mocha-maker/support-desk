import { useSelector } from 'react-redux'

function NoteItem({ note }) {
  const { user: userAuth } = useSelector((state) => state.auth)
  const { content, user, isStaff, ticket, createdAt } = note

  return (
    <div
      className='note'
      style={{
        backgroundColor: isStaff && '#333333',
        color: note.isStaff && '#ffffff',
      }}
    >
      <strong>{isStaff ? 'Staff' : userAuth.name}</strong>
      <p>{content}</p>
      <span className='note-date'>
        Posted {new Date(createdAt).toLocaleString('en-US')}
      </span>
    </div>
  )
}
export default NoteItem
