import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import axios from 'axios';
const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = user;


  const handleChange = (e) => {

    setUser({ ...user, [e.target.name]:e.target.value });

  }
  const handleSubmit = async (e) => {
    // localStorage.setItem('user',JSON.stringify(user));
    try {
      e.preventDefault();

      await axios.post('/api/v1/register',{...user})

      localStorage.setItem('firstLogin',true)
      window.location.href = '/';

      toast.success('Registeration Successful', {
        position: "top-center",
      })
      
    } catch (err) {

      toast.error(err.response.data.message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
});
    }

  }
  return (
    <div className="flex flex-col bg-gray-100 m-2 rounded-sm">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form className="bg-white px-6 py-rounded shadow-md text-black w-full m-4" onSubmit = {handleSubmit}>
          <h1 className="m-8 text-3xl text-center">Sign Up</h1>
          <input
            type="text"
            name= 'name'
            placeholder="Name"
            required
            className="block border border-gray-300 w-full p-3 rounded mb-4 outline-none focus:ring-1 focus:ring-gray-100"
            value= {name}
            onChange={handleChange}
          
          />
          <input
            type="email"
            name= 'email'
            placeholder="Email"
            required
            className="block border border-gray-300 w-full p-3 rounded mb-4 outline-none focus:ring-1 focus:ring-gray-100"
            value= {email}
            onChange={handleChange}
          
          />
          <input
            type="password"
            name= 'password'
            placeholder="Password"
            required
            className="block border border-gray-300 w-full p-3 rounded mb-4 outline-none focus:ring-1 focus:ring-gray-100"
            value = {password}
            onChange={handleChange}
          
          />
          <button type="submit" className="w-full text-center py-3 rounded bg-blue-400 text-white mb-4 hover:bg-blue-300 hover:shadow-lg hover:border-transparent" >Register</button>
        </form>

        <div className="text-gray-500 mb-4 flex justify-center items-center">
           have an account ?
          <Link  to = '/login' className = 'text-blue-500 text-2xl mx-1 '>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
