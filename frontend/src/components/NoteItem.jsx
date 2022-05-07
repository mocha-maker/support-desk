import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getUserById } from '../context/auth/authSlice'
import Spinner from './Spinner'

function NoteItem({ note }) {
  const {
    user: userAuth,
    isLoading,
    isSuccess,
    isError,
    message,
  } = useSelector((state) => state.auth)
  const { content, user: userId, isStaff, createdAt } = note
  const [userName, setUserName] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async (id) => {
      const response = await dispatch(getUserById(id))
      setUserName(response.payload.name)

      if (isError) {
        toast.error(message)
        setUserName('Unknown')
      }
    }
    if (userAuth.isAdmin) {
      console.log('User is Staff')
      getUser(userId)
    } else if (isStaff) {
      console.log('Note is from Staff')
      setUserName('Staff')
    } else if (userAuth._id === userId) {
      console.log('User owns ticket')
      setUserName(userAuth.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div
      className='note'
      style={{
        backgroundColor: isStaff && '#333333',
        color: note.isStaff && '#ffffff',
      }}
    >
      <strong>
        {userName} {isStaff && '(Staff)'}
      </strong>
      <p>{content}</p>
      <span className='note-date'>
        Posted {new Date(createdAt).toLocaleString('en-US')}
      </span>
    </div>
  )
}
export default NoteItem
