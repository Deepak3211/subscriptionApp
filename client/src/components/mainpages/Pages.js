import { Routes, Route} from 'react-router-dom'
import Home from '../mainpages/home/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import StripeSuccess from './stripe/StripeSuccess';
import StripeCancel from './stripe/StripeCancel';
import Account from './user/Account';
import Basic from './plans/Basic';
import Standard from './plans/Standard';
import Premium from './plans/Premium';

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
          <Route path='/stripe/success' element={isLoggedIn ? <StripeSuccess />: ''} />
          <Route path='/stripe/cancel' element={isLoggedIn ? <StripeCancel />: ''} />
        <Route path='/account' element={isLoggedIn ? <Account />: 'Not Found'} />
        
          <Route path='/basic' element={isLoggedIn ? <Basic />: ''} />
          <Route path='/standard' element={isLoggedIn ? <Standard /> : ''} />
          <Route path='/premium' element={isLoggedIn ? <Premium /> : ''} />
        
        <Route path='*' element={<h3>Not Found </h3>} />
        
      </Routes>
      
    </div>
  )
}

export default Pages
