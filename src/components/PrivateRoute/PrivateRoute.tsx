import {useDispatch} from 'react-redux'
import {Navigate, Outlet} from 'react-router-dom'

import {setUserId} from '../../store/Authentication'

const PrivateRoute = () => {
  const dispatch = useDispatch()
  const user = window.localStorage.getItem('user')
  user && dispatch(setUserId(user))

  return (
    user
      ? <Outlet/>
      : <Navigate to={'/SignIn'}/>
  )
}

export default PrivateRoute
