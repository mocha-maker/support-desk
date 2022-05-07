// Utilities
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Header from './components/Header';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute'

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateTicket from './pages/CreateTicket';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';
import Admin from './pages/Admin'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create-ticket' element={<PrivateRoute />}>
              <Route path='/create-ticket' element={<CreateTicket />} />
            </Route>
            <Route path='/tickets' element={<PrivateRoute />}>
              <Route path='/tickets' element={<Tickets />} />
            </Route>
            <Route path='/ticket/:ticketId' element={<PrivateRoute />}>
              <Route path='/ticket/:ticketId' element={<Ticket />} />
            </Route>
            <Route path='/admin' element={<PrivateRoute />}>
              <Route path='/admin' element={<Admin />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;
