import Card from "../card/Card"
import {useContext, useEffect} from "react"
import { GlobalState } from "../../../GlobalState";
const Home = () => {

  const state = useContext(GlobalState);
  // console.log(state.SubcriptionAPI.subscriptionPlan);
  const [subscriptionPlan] = state.SubcriptionAPI.subscriptionPlan;
  // console.log(subscriptionPlan);
  useEffect(() => {
    
  }, [])
  const handleClick = (e) => {
    e.preventDefault();
  }
  return (<>
  
    <h1 className='font-mono text-5xl font-semibold text-yellow-600 text-center mt-16'>Become a Pro Member</h1>
    <div className = 'flex justify-center items-center gap-8 mt-10 flex-wrap'>
      {subscriptionPlan && subscriptionPlan.map((plan) => <Card key={plan.id} price={plan} handleClick={handleClick}/>)}
    </div>
  </>
  )
}

export default Home
