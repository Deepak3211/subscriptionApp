import { useContext ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import Card from "./Card"
import Linkedin from './images/linkedin1.png'
import Payment from './images/payment.png'

const Basic = () => {
  const state = useContext(GlobalState);
  const [userInfo] = state.UserAPI.userInfo;
  // console.log(state)
  const navigate = useNavigate();

  useEffect(() => {

    const getPlan = () => {
      if (!userInfo.subscriptionPlan) {
        navigate('/')
      }
    }
    getPlan()
  },[userInfo,navigate]);
  return (
    <div className = 'flex justify-center items-center gap-8 mt-10 flex-wrap'>
      <Card image = {Linkedin} name = 'Linkedin ' demo = 'https://linkedin-2008b.web.app/register' githubLink = 'https://github.com/Deepak3211'/>
      <Card image = {Payment} name = 'Razorpay  Integration ' demo = 'https://fir-b1e46.web.app/' githubLink = 'https://github.com/Deepak3211/razorpay_integration'/>
     
    </div>
  )
}

export default Basic
