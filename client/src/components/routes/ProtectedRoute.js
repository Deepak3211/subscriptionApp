import {Navigate, Outlet} from 'react-router-dom'
const ProtectedRoute = () => {

  const auth = () => {
    const user = localStorage.getItem('firstLogin');
    return user;
  }
  return auth() ? <Outlet />: <Navigate to ='/login' />;

}

export default ProtectedRoute
