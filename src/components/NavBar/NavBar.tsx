import './NavBar.styles.scss'
import {Drawer} from '@mui/material'
import {useEffect, useState} from 'react'

import DropDown from '../../assets/dropdown.png'
import ProfilePicture from '../../assets/profile.png'
import SideBar from '../SideBar/SideBar'

const NavBar = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [isVisivle, setIsVisible] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const openDrawer = () => {
    setIsVisible(true)
  }

  const CloseDrawer = () => {
    setIsVisible(false)
  }

  return (
    <div className="navbar">
      <Drawer
        open={isVisivle}
        onClose={CloseDrawer}
        anchor='left'>
        <SideBar fromNavBar='fromNavBar'/>
      </Drawer>
      {
        screenWidth < 701 && (
          <div onClick={openDrawer} className='drop-down-container'>
            <img
              src={DropDown}
              width={'20px'}
              className='dropdwon-icon'
            />
          </div>
        )
      }
      <img
        src={ProfilePicture}
        alt="no dp"
        className="profile-picture"
        width={'50px'}
      />
    </div>
  )
}

export default NavBar
