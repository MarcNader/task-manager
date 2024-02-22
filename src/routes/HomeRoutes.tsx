import {Route, Routes} from 'react-router-dom'

import Home from '../screens/Home/Home'

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home/>} />
    </Routes>)
}

export default HomeRoutes
