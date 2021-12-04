import { Routes, Route } from 'react-router-dom'
import Home from '../mainpages/home/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import { ToastContainer } from 'react-toastify';
const Pages = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element = { <Home />}/>
        <Route path='/register' element = { <Register />}/>
        <Route path='/Login' element={<Login />} />
        <Route path = '*' element = { <h3>Not Found </h3>}/>
      </Routes>
      
    </div>
  )
}

export default Pages
