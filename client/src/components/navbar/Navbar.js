import { Link } from 'react-router-dom'
import {AiOutlineHome,AiOutlineLogin,AiOutlineLogout,AiOutlineUser} from 'react-icons/ai'
import { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import axios from 'axios'
const Navbar = () => {
  const state = useContext(GlobalState);
  const [isLoggedIn] = state.UserAPI.isLoggedIn;

  const logoutUser = async () => {
    await axios.get('/api/v1/logout');
    localStorage.removeItem('firstLogin');
    window.location.href = '/'

  }
  const userRouter = () => {
    return (
      <>
       <li className=' flex justify-center items-center space-x-1'>

        <AiOutlineLogout />
          <Link to='/' onClick={logoutUser}>logout</Link>
          
        </li>
      </>
    )
  }

  return (
    <ul className='flex  space-x-4 m-2 p-4 bg-gray-700 text-gray-100 rounded'>
      <li className=' flex  justify-center items-center space-x-1 '>
        <AiOutlineHome />
        
      <Link to='/'>Home</Link>
      </li>
      {isLoggedIn ? userRouter() :
        <>
      <li className=' flex justify-center items-center space-x-1'>

        <AiOutlineUser />
      <Link to = '/register'>Register</Link>
      </li>
      <li className=' flex justify-center items-center space-x-1'>
        <AiOutlineLogin />
        
      <Link to = '/login'>Login</Link>
      </li>
        </>
      
    }
    </ul>
  )
}

export default Navbar
