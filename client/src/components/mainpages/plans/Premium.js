import Card from "./Card"
import Moderator from './images/nd_logo.png'
import Linkedin from './images/linkedin1.png'
import Payment from './images/payment.png'
import ChatRoom from './images/chat.png'
import Eshop from './images/eShop.png'
import { useEffect, useContext,  } from "react"
import { GlobalState } from "../../../GlobalState"
import { useNavigate } from "react-router-dom"
const Premium = () => {
   const state = useContext(GlobalState);
  const [userInfo] = state.UserAPI.userInfo;
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
    <div className = 'flex justify-center items-center gap-8 mt-10 flex-wrap '>
      <Card image = {Moderator} name = 'Nudity Detector ' demo = 'https://image-moderator1.herokuapp.com/' githubLink = 'https://github.com/Deepak3211/image_moderation'/>
      <Card image = {Eshop} name = 'eShop ' demo = 'https://shop-direct.herokuapp.com/' githubLink = 'https://github.com/Deepak3211/image_moderation'/>
      <Card image = {Linkedin} name = 'Linkedin ' demo = 'https://linkedin-2008b.web.app/register' githubLink = 'https://github.com/Deepak3211'/>
      <Card image = {ChatRoom} name = 'Chat Room ' demo = 'https://chat-app-4256d.web.app/' githubLink = 'https://github.com/Deepak3211/chat_app_firebase'/>
      <Card image = {Payment} name = 'Razorpay Integration ' demo = 'https://fir-b1e46.web.app/' githubLink = 'https://github.com/Deepak3211/razorpay_integration'/>
     
    </div>
  )
}

export default Premium
