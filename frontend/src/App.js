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

function App() {
  return <>
    <Router>
      <div className="container">
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/create-ticket' element={<PrivateRoute/>}>
            <Route path='/create-ticket' element={<CreateTicket />} />
          </Route>
          <Route path='/tickets' element={<PrivateRoute/>}>
            <Route path='/tickets' element={<Tickets />} />
          </Route>
        </Routes>
      </div>
    </Router>
    <ToastContainer/>
  </>
}

export default App;
