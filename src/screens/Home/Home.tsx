import {Fragment} from 'react'
import {Outlet} from 'react-router-dom'
import './Home.styles.scss'

import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'

const Home = () => {
  return (
    <Fragment>
      <div className="wrapper">
        <SideBar/>
        <div className="Second-col">
          <NavBar/>
          <Outlet/>
        </div>
      </div>
    </Fragment>
  )
}

export default Home
