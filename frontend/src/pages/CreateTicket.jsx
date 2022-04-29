import { useState } from 'react'
import { useSelector } from 'react-redux'

function CreateTicket() {
  const { user } = useSelector((state) => state.auth)
  const [name] = useState(user.name)
  const [email] = useState(user.email)

  const [product, setProduct] = useState('')
  const [description, setDescription] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
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
              onChange={(e) => setProduct(e.target.value)}
            >
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
            ></textarea>
          </div>
        </form>
      </section>
    </>
  )
}
export default CreateTicket
