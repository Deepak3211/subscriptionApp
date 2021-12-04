import axios from "axios";
import { useEffect, useState } from "react";

const SubcriptionAPI = () => {
  const [subscriptionPlan, setSubscriptionPlan] = useState([]);

  const getPrices = async () => {
    const { data } = await axios.get('/api/v1/getPrice');
    // console.log(data)
    setSubscriptionPlan(data)
  }
  useEffect(() => {

    getPrices();
  },[])
  
  return {

    subscriptionPlan: [subscriptionPlan, setSubscriptionPlan]
  }
  
}

export default SubcriptionAPI
