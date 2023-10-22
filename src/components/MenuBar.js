import { React, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import MenuBarItem from './MenuBarItem'
import TitleBarComponent from './TitileBar'
import { FaSignOutAlt } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import './MenuBar.css'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { useActive } from '../context/ActiveContext'

import axios from 'axios'

const menuBarData = [
  'Dashboard',
  'All Employees',
  'Create Employee',
  'Export Payroll',
]

function MenuBarComponent() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()
  const [visibility, setVisibility] = useState('hidden')
  const { active, setActive } = useActive()

  // console.log(active)

  const navigate = useNavigate()

  // console.log(authUser.user)

  const logout = () => {
    // const url = 'http://localhost:3001/logout'
    const url = 'https://imperiumpayrollservice-bck.onrender.com/logout'
    setActive('')

    axios
      .post(url)
      .then((response) => {
        console.log(response.data, 'huigsdhifsdhifshdoisodhi')
      })
      .catch((error) => {
        console.log('logout error')
      })
    setAuthUser({ user: 'user' })
    setIsLoggedIn(false)
    navigate('/login')
  }

  useEffect(() => {
    if (authUser.user === 'user') {
      setVisibility('hidden')
      // console.log('hide ohhh')
    } else {
      setVisibility('visible')
      // console.log('show now')
    }
  })

  return (
    <div className="menu_bar">
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        <TitleBarComponent />
      </Link>
      <div className="menu_links">
        <Link to="/" className="lnk">
          <MenuBarItem
            props={{
              property: menuBarData[0],
              isActive: menuBarData[0] === active ? true : false,
            }}
          />
        </Link>
        <Link to="/employees" className="lnk">
          <MenuBarItem
            props={{
              property: menuBarData[1],
              isActive: menuBarData[1] === active ? true : false,
            }}
          />
        </Link>
        <Link to="/create_employee" className="lnk">
          <MenuBarItem
            props={{
              property: menuBarData[2],
              isActive: menuBarData[2] === active ? true : false,
            }}
          />
        </Link>
        <Link to="/export" className="lnk">
          <MenuBarItem
            props={{
              property: menuBarData[3],
              isActive: menuBarData[3] === active ? true : false,
            }}
          />
        </Link>
      </div>

      <button
        className="log_out"
        style={{
          visibility: `${visibility}`,
        }}
        onClick={(e) => {
          logout(e)
        }}
      >
        <FaSignOutAlt /> {authUser.user === 'user' ? 'login' : 'logout'}
      </button>
    </div>
  )
}

export default MenuBarComponent
