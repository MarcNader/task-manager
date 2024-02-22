import {Route, Routes} from 'react-router-dom'

import SignIn from '../screens/SignIn/SignIn'
import SignUp from '../screens/SignUp/SignUp'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/signin" element={<SignIn/>} />
    </Routes>
  )
}

export default AuthRoutes
