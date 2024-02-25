import './SideBar.styles.scss'
import {NavLink, Navigate} from 'react-router-dom'

import LogoutIcon from '../../assets/logout.png'
import Rabbit from '../../assets/rabbit2.png'
import TasksIcon from '../../assets/tasks.png'

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
          <NavLink
            to={'/ComingSoon'}
            className="sidebar-link"
            replace={true}>
            <img src={TasksIcon} className="logo" />
            Progress
          </NavLink>
          <NavLink to={'ComingSoon'} className="sidebar-link">
            <img src={TasksIcon} className="logo" />
            Schedule
          </NavLink>
          <NavLink to={'ComingSoon'} className="sidebar-link">
            <img src={TasksIcon} className="logo" />
            Theme
          </NavLink>
        </div>
      </div>

      <div className="sidebar-footer">
        <NavLink to={''} className="sidebar-link">
          <img src={LogoutIcon} className="logo"/>
          Logout
        </NavLink>
      </div>
    </div>
  )
}

export default SideBar
