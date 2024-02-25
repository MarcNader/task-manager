import {Route, Routes} from 'react-router-dom'

import './App.css'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import ComingSoon from './screens/ComingSoon/ComingSoon'
import Home from './screens/Home/Home'
import SignIn from './screens/SignIn/SignIn'
import SignUp from './screens/SignUp/SignUp'
import Tasks from './screens/Tasks/Tasks'

const App = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute/>}>
        <Route path='/' element={<Home/>}>
          <Route path='/Tasks' element={<Tasks/>}/>
          <Route path='/ComingSoon' element={<ComingSoon/>}/>
        </Route>
      </Route>
      <Route path='/Signup' element={<SignUp/>}/>
      <Route path='/SignIn' element={<SignIn/>}/>
    </Routes>

  )
}

export default App
