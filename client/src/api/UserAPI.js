import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UserAPI = (token) => {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [userPlan,setUserPlan] = useState([]);
// console.log(userInfo);
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const { data } = await axios.get('/api/v1/getUserInfo', {
            headers: {Authorization:token}
          })
         
          const { name, email,subscriptionPlan } = data;
          // console.log(data);
          setIsLoggedIn(true);
          setUserInfo({email,name, subscriptionPlan});
           
        } catch (err) {
          toast.error(err.response.data.message);
        }
      }
      getUser();
    }
    
  }, [token,isLoggedIn]);
  
  return {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    userInfo: [userInfo, setUserInfo],
    userPlan: [userPlan, setUserPlan]
  }
}
export default UserAPI;