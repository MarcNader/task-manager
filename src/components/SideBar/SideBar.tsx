import './SideBar.styles.scss'
import {NavLink, Navigate} from 'react-router-dom'

import LogoutIcon from '../../assets/logout.png'
import Rabbit from '../../assets/rabbit2.png'
import TasksIcon from '../../assets/tasks.png'
import {signoutUser} from '../../utils/firebaseConfig'

type SideBarProps = {
  fromNavBar?: string
}

const SideBar = ({fromNavBar}: SideBarProps) => {
  const isfromNavBar = fromNavBar
    ? 'side-bar'
    : 'side-bar hide-side-bar'

  return (
    <div className={isfromNavBar}>
      <div>
        <div className="header">
          <img
            src={Rabbit}
            className="logo-icon"
            alt="none found to display"
          />
          <span className="logo-title">TaskRabbit</span>
        </div>
        <Navigate to="Tasks" replace={true}/>
        <div className="sidebar-body">
          <NavLink
            to={'/Tasks'}
            className="sidebar-link">
            <img src={TasksIcon} className="logo" />
            Tasks
          </NavLink>
          <div
            className="sidebar-link">
            <img src={TasksIcon} className="logo" />
            Progress
          </div>
          <div className="sidebar-link">
            <img src={TasksIcon} className="logo" />
            Schedule
          </div>
          <div className="sidebar-link">
            <img src={TasksIcon} className="logo" />
            Theme
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <a
          href='/'
          className="sidebar-link"
          onClick={signoutUser}>
          <img src={LogoutIcon} className="logo"/>
          Logout
        </a>
      </div>
    </div>
  )
}

export default SideBar
