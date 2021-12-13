import { useNavigate } from "react-router-dom";
import {FaUserTie} from 'react-icons/fa'
import { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";

const Account = () => {
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const [subscriptions] = state.SubcriptionAPI.subscriptions;
  const [token] = state.token;
  const [userInfo] = state.UserAPI.userInfo;
  // console.log('subscriptions', subscriptions);

  const manageSubscription = async() => {
  try {
    const { data } = await axios.get('/api/v1/customer-portal', {
      headers: { Authorization: token }
    })
    window.open(data)
  } catch (err) {
    toast.error(err.response.data.message);
  }
}
  return (
    <div className="flex justify-center items-center flex-col ">
      <div className="border-2 border-gray-200 rounded-sm bg-gray-50 p-8 flex justify-center items-center flex-col shadow-xl">
      <FaUserTie className="text-9xl border-2 border-gray-500 rounded-full p-2 bg-gray-200 " />

        <h1 className="text-3xl bg-yellow-300 my-2 p-2 rounded-md ">Username : {userInfo.name }</h1>
        <h1 className="text-xl  rounded-full p-2  bg-yellow-200 my-2 ">Email : {userInfo.email }</h1>
      </div>
      {subscriptions && subscriptions.map((subscription) => (
  
        <div key={subscription.id} className = 'flex justify-center items-center  rounded w-full shadow-md flex-col' >
          <table className = 'max-w-full m-8 md:w-1/2'>
            <thead className="bg-gray-50  ">
              <tr  className="border-2 border-gray-200 ">
                <th>Billing Information</th>
              </tr>
              <tr className="" >
                <th  className="border-2 border-gray-200 uppercase ">
                S.No.
              </th>
                <th  className="border-2 border-gray-200  uppercase">
                Plan
              </th>
                <th className="border-2 border-gray-200  uppercase">
                Period Start
              </th>
                <th  className="border-2 border-gray-200  uppercase">
                Period End
              </th>
                <th  className="border-2 border-gray-200  uppercase">
                Amount Charged
              </th>
                <th  className="border-2 border-gray-200  uppercase">
                Status
              </th>
               
               
              </tr>
            </thead>
            <tbody className= 'text-center p-8 m-8 '>
              <tr >
                <td className= 'border-2 border-gray-200 '>1</td>
                <td className= 'border-2 border-gray-200'>{subscription.plan.nickname }</td>
                <td className= 'border-2 border-gray-200'>{moment(subscription.current_period_start * 1000).format('Do MMM YYYY, h:mm:ss a')}</td>
                <td className= 'border-2 border-gray-200 bg-red-600'>{moment(subscription.current_period_end * 1000).format('Do MMM YYYY, h:mm:ss a')}</td>
                <td className= 'border-2 border-gray-200'>INR {(subscription.plan.amount / 100).toLocaleString('en-US',{style: 'currency',currency: subscription.plan.currency
                  })}</td>
                <td className= 'border-2 border-gray-200 bg-yellow-500'>{subscription.status }</td>
              </tr>
            </tbody>

          </table>
          <div className= 'flex gap-4'>

            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-2" onClick={()=>navigate(`/${subscription.plan.nickname.toLowerCase()}`)}>Access Plan
            </button>
            <button
              onClick={manageSubscription}
              className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-blue-500 rounded m-2">Manage Subscriptions</button>
          </div>
        </div>

))}
    </div>
  )
}

export default Account
