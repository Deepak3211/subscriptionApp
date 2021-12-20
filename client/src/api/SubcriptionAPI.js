import axios from "axios";
import { useEffect, useState } from "react";

const SubcriptionAPI = (token) => {
  const [subscriptionPlan, setSubscriptionPlan] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
// console.log(subscriptions)
  const getPrices = async () => {
    const { data } = await axios.get('/api/v1/getPrice');
    // console.log(data)
    setSubscriptionPlan(data)
  }
  useEffect(() => {

    getPrices();
  },[])
  

  const getSubscriptions = async () => {
    if (token) {
      try {
     const { data } = await axios.get('/api/v1/subscriptions', {
      headers: { Authorization: token }
    });
    setSubscriptions(data.data);
    // console.log('subscriptions',data);
    
  } catch (err) {
    console.error(err.response.data.message)
  }
}
   
    

  }
  useEffect(() => {

    getSubscriptions();
  },[token])
  return {

    subscriptionPlan: [subscriptionPlan, setSubscriptionPlan],
    subscriptions: [subscriptions, setSubscriptions],
  }
  
}

export default SubcriptionAPI
