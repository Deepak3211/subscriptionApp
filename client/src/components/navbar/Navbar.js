import { Link } from 'react-router-dom'
import {AiOutlineHome,AiOutlineLogin,AiOutlineLogout,AiOutlineUser} from 'react-icons/ai'
import { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import axios from 'axios';
import {MdArrowDropDown,MdManageAccounts} from 'react-icons/md'
const Navbar = () => {
  const state = useContext(GlobalState);
  const [isLoggedIn] = state.UserAPI.isLoggedIn;
  const [userInfo] = state.UserAPI.userInfo
  const logoutUser = async () => {
    await axios.get('/api/v1/logout');
    localStorage.removeItem('firstLogin');
    window.location.href = '/'

  }
  const userRouter = () => {
    return (
      <>
      <div className="group relative inline-block ">
  <button className=" flex justify-center items-center bg-gray-800 rounded-full p-2 ">{userInfo.name}
  <MdArrowDropDown />
  </button>
  <div className="absolute text-gray-800 border border-grey-800 rounded-md px-4 py-2  invisible group-hover:visible group-hover:bg-gray-100 ">
  <li className=' flex justify-center items-center space-x-1 hover:bg-gray-100'>

        <MdManageAccounts />
          <Link to='/account'>Account</Link>
          
        </li>
  <li className=' flex justify-center items-center space-x-1 hover:bg-gray-100'>

        <AiOutlineLogout />
          <Link to='/' onClick={logoutUser}>logout</Link>
          
        </li>
  </div>
</div>
       {/* <li className=' flex justify-center items-center space-x-1'>

        <AiOutlineLogout />
          <Link to='/' onClick={logoutUser}>logout</Link>
          
        </li> */}
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
