import Card from "../card/Card"
import {useContext, useEffect} from "react"
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  let navigate = useNavigate();

  const state = useContext(GlobalState);
  // console.log(state.SubcriptionAPI.subscriptionPlan);
  const [subscriptionPlan] = state.SubcriptionAPI.subscriptionPlan;
  const [isLoggedIn] = state.UserAPI.isLoggedIn;
  const [token] = state.token;
  useEffect(() => {
    
  }, [])

  // HandleSubscription
  const handleSubscription = async (e,price) => {
    e.preventDefault();
    // console.log(price.id);
    if (isLoggedIn && token ) {
      const { data } = await axios.post('/api/v1/create-subscription', {
        priceID: price.id
      }, {
        headers: {Authorization: token}
      })
      // console.log('data',data)
      window.open(data);
    }
    else {
     navigate("/register", { replace: true });
    }
    
  }
  return (<>
  
    <h1 className='font-mono text-5xl font-semibold text-yellow-600 text-center mt-16'>Become a Pro Member</h1>
    <div className = 'flex justify-center items-center gap-8 mt-10 flex-wrap'>
      {subscriptionPlan && subscriptionPlan.map((plan) => <Card key={plan.id} price={plan} handleSubscription={handleSubscription}/>)}
    </div>
  </>
  )
}

export default Home
