import {Navigate, Outlet} from 'react-router-dom'

const PrivateRoute = () => {
  const status = window.localStorage.getItem('isLoggedIn')

  return (
    status
      ? <Outlet/>
      : <Navigate to={'/SignIn'}/>
  )
}

export default PrivateRoute
