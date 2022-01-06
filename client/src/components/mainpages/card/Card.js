import { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
const Card = ({ price, handleSubscription,userPlan }) => {
  const state = useContext(GlobalState);
  const [isLoggedIn] = state.UserAPI.isLoggedIn;
  // console.log(userPlan,'hdidihd');
  // console.log(price.id,'😆');
  const handleDynamicData = ()=>{
// console.log(price.nickname)
    if(price.nickname === 'BASIC'){
      return '2 Full Stack Projects'
    }
    else if (price.nickname === 'STANDARD'){
      return '5 Full Stack Projects'
    }
    else if (price.nickname === 'PREMIUM'){
      return '10 Full Stack Projects'
    }

  }
  const btnStyle = ()=>{
    return price.nickname === 'STANDARD'? 'bg-red-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-yello-700 hover:border-blue-500 rounded w-full mt-8 text-2xl text-center' : 'bg-yellow-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-yello-700 hover:border-blue-500 rounded w-full mt-8 text-2xl text-center'
  }
  const btnText = () => {
    return state.token && isLoggedIn ? 'Buy Now': 'START LEARNING NOW'
  }
const cardStyle = ()=>{

  return price.nickname === 'STANDARD' ? 'flex justify-center items-center max-w-sm rounded overflow-hidden shadow-lg flex-col border-solid border-t border-l border-r border-red-600 ':'flex justify-center items-center max-w-sm rounded overflow-hidden shadow-lg flex-col'
}
  
  return (
    <div className={cardStyle()}>
      <h2 className="font-mono p-8 m-4 text-2xl font-bold  border-b-2 text-center">{ price.nickname}</h2>
      
    <div className="flex   max-w-sm rounded p-8 text-justify flex-col">
        <h2 className="font-medium text-2xl mb-6 text-center">{ (price.unit_amount/100).toLocaleString('en-US',{style: 'currency', currency:'INR'})}/Month</h2>
        <p> ✓ {handleDynamicData()}</p>
        <p> ✓ Access to the Github Repo</p>
        <p> ✓ Exclusive member-only content</p>
        <p> ✓ Access to private whatsapp group</p>
        <p> ✓ Email Support</p>
      </div>
      <button
        className={btnStyle()}
        onClick={(e) => handleSubscription(e, price)}>
        {userPlan && userPlan.includes(price.id) ? 'Access Now ' : btnText()}
        </button>
    </div>
  )
}

export default Card
