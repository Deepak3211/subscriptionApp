import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import Loader from "../utils/loading/Loader";

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const { email, password } = user;
const [loading , setLoading] = useState(false);

  const handleChange = (e) => {

    setUser({ ...user, [e.target.name]:e.target.value });

  }
 

  const handleSubmit =  async (e) => {
    try {
      e.preventDefault();

      setLoading(true);
      await axios.post('api/v1/login', { ...user })
      
      
      
      
      localStorage.setItem('firstLogin', true)
      window.location.href = '/';
      toast('Login Successful', {
        position: "top-center",
      })

      setLoading(false);
    } catch (err) {

      setLoading(false)
      toast.error(err.response.data.message, {
        position: "bottom-right",
    
      });

    }
  }
  
    
  return (
    <div className="flex flex-col bg-gray-100 m-2 rounded-sm">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form className="bg-white px-6 py-rounded shadow-md text-black w-full m-4" onSubmit = {handleSubmit}>
          <h1 className="m-8 text-3xl text-center">Sign In</h1>
          <input
            type="email"
            name= 'email'
            placeholder="Email"
            required
            className="block border border-gray-300 w-full p-3 rounded mb-4 outline-none focus:ring-1 focus:ring-gray-100"
            value={email}
            onChange={handleChange}

          
          />
          <input
            type="password"
            name= 'password'
            placeholder="Password"
            required
            className="block border border-gray-300 w-full p-3 rounded mb-4 outline-none focus:ring-1 focus:ring-gray-100"
            value={password}
            onChange={handleChange}
          
          />
          <button type="submit" className="w-full text-center py-3 rounded bg-blue-400 text-white mb-4 hover:bg-blue-300 hover:shadow-lg hover:border-transparent " disabled = {!email || !password}
          
          >{ loading ? <Loader />: 'Login'}</button>
        </form>

        <div className="text-gray-500 mb-4 flex justify-center items-center">
          Don't have an account ?
          <Link  to = '/register' className = 'text-blue-400 text-2xl mx-1 '>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
