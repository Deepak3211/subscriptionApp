import axios from "axios"
import { useContext, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import {GlobalState} from '../../../GlobalState'
const StripeSuccess = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  // console.log(token)

  
  const navigate = useNavigate();
  useEffect(() => {
      const getSubscriptionStatus = async () => {
        const { data } = await axios.get('/api/v1/subscription-status', {
          headers: {Authorization: token}
        });
        if (data ) {
          
          // console.log(data)
          navigate('/account')
        }
        else {
          navigate('/')
        }
      }
      getSubscriptionStatus()
},[token,navigate]);
  return (
    <div className="flex justify-center items-center">
  <div
    className="
      animate-spin
      rounded-full
      h-44
      w-44
      border-t-2 border-b-2 border-green-500
    ">
        
      </div>
</div>
  )
}

export default StripeSuccess
