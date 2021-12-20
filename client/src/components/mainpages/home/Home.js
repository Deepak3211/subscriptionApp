import Card from "../card/Card"
import {useContext, useEffect} from "react"
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  let navigate = useNavigate();

  const state = useContext(GlobalState);
  const [subscriptionPlan] = state.SubcriptionAPI.subscriptionPlan;
  const [isLoggedIn] = state.UserAPI.isLoggedIn;
const [userPlan,setUserPlan] = state.UserAPI.userPlan;
  const [token] = state.token;

  useEffect(() => {
    if (token) {
      let result = []
      const getUserPlans = async () => {
        try {
          const { data } = await axios.get('/api/v1/getUserInfo', {
            headers: { Authorization: token }
          })
         
          const { subscriptionPlan } = data;
          // console.log(subscriptionPlan);
          subscriptionPlan && subscriptionPlan.map((plan) => {

            // console.log(plan, '🤣')
            result.push(plan.plan.id)
            setUserPlan(result)
            navigate('/')
          })
          //  console.log(result)
        } catch (err) {
        console.error(err.response.data.message);
        }
      }
      getUserPlans();
    }
    
  }, [token,navigate]);

  // HandleSubscription
  const handleSubscription = async (e,price) => {
    e.preventDefault();
    if (userPlan && userPlan.includes(price.id)) {
      navigate(`/${price.nickname.toLowerCase()}`)
      return;
      //2nd if condition will not execute
    }
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
      {subscriptionPlan && subscriptionPlan.map((plan) => <Card key={plan.id} price={plan} handleSubscription={handleSubscription} userPlan={userPlan} />)}
    </div>
  </>
  )
}

export default Home
