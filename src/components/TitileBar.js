import React from 'react'

import { FaBriefcase, FaUserTie, FaUsers } from 'react-icons/fa'

import './TitleBar.css'

const TitleBarComponent = () => {
  return (
    <div className="title_bar">
      <div className="titleDiv">
        <img className="logo" src="../../images/imp.svg" alt="" />
        <div className="logoText">
          <h3>Imperium </h3>
          <h3>Industries</h3>
        </div>
      </div>
      {/* <div className="info">
        <p>
          <FaUserTie color="lightblue" />
          <b> {userData.nuhuUsman.surname.toUpperCase()},</b>{' '}
          {userData.nuhuUsman.first_name}
        </p>

        <p>
          <FaBriefcase color="lightblue" />
          {'  '}
          <span style={{ fontSize: '80%' }}>{userData.nuhuUsman.position}</span>
        </p>
      </div> */}
    </div>
  )
}
export default TitleBarComponent
