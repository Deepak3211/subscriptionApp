import { Routes, Route} from 'react-router-dom'
import Home from '../mainpages/home/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import { ToastContainer } from 'react-toastify';
import StripeSuccess from '../../utils/loading/StripeSuccess';
import StripeCancel from '../../utils/loading/StripeCancel';
import ProtectedRoute from '../routes/ProtectedRoute';
import { useContext } from 'react';
import { GlobalState } from '../../GlobalState';

const Pages = () => {
  
  const state = useContext(GlobalState);
  const [isLoggedIn] = state.UserAPI.isLoggedIn;
// console.log(isLoggedIn)
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element = { <Home />}/>
        <Route path='/register' element = { isLoggedIn ? 'Not Found':<Register />}/>
        <Route path='/Login' element={isLoggedIn ?'Not Found': <Login />} />
        <Route element = {<ProtectedRoute />} >
          <Route path='/stripe/success' element={<StripeSuccess />} />
       </Route>
        <Route element = {<ProtectedRoute />} >
          <Route path='/stripe/cancel' element={<StripeCancel />} />
       </Route>
        <Route path = '*' element = { <h3>Not Found </h3>}/>
      </Routes>
      
    </div>
  )
}

export default Pages
