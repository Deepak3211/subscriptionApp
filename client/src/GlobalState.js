import axios from 'axios'
import {createContext,useEffect, useState} from 'react'
import UserAPI from './api/UserAPI'
import SubcriptionAPI from './api/SubcriptionAPI'
export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      const {data} = await axios.get('/api/v1/refresh_token')
      setToken(data.accessToken)
    }
  }
  useEffect  (() => {
    
    setTimeout(() => {
      refreshToken()
    }, 10 * 60 * 1000);
    refreshToken()
  }, [])
  
  const state = {
    token: [token, setToken],
    UserAPI: UserAPI(token),
    SubcriptionAPI: SubcriptionAPI()
  }
  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  )
}