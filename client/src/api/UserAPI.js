import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UserAPI = (token) => {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
// console.log(userInfo);
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const { data } = await axios.get('/api/v1/getUserInfo', {
            headers: {Authorization:token}
          })
         
          const { name, email } = data;
          // console.log(data);
          setUserInfo({email,name});
          setIsLoggedIn(true);
           
        } catch (err) {
          toast.error(err.response.data.message);
        }
      }
      getUser();
    }
    
  }, [token]);
  
  return {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    userInfo:[userInfo, setUserInfo],
  }
}
export default UserAPI;