import React from 'react'
import {
  FaBars,
  FaInfinity,
  FaUserTie,
  FaSlidersH,
  FaPeopleCarry,
  FaChalkboard,
  FaChartArea,
  FaMonero,
  FaCashRegister,
  FaMoneyCheck,
  FaOutdent,
  FaUsers,
  FaMoneyBillWave,
} from 'react-icons/fa'
import './MenuBarItemStyle.css'

import { useActive } from '../context/ActiveContext'
import { useEffect, useState } from 'react'

function MenuBarItem({ props }) {
  const [col, setCol] = useState(['', ''])

  useEffect(() => {
    if (props.isActive === true) {
      setCol(['#098FA6', 'white'])
    } else if (props.isActive === false) {
      setCol(['', ''])
    } else {
      setCol(['#098FA6', 'black'])
    }
  }, [props.isActive])

  // console.log(props.isActive, '--->>>')
  return (
    <button
      className="btn"
      style={{
        background: col[0],
        color: col[1],
      }}
    >
      {(() => {
        switch (props.property) {
          case 'Dashboard':
            return <FaChalkboard size="20px" />
          case 'All Employees':
            return <FaUsers size="20px" />
          case 'Export Payroll':
            return <FaOutdent size="20px" />
          case 'Create Employee':
            return <FaUserTie size="20px" />
          case 'Payment Summary':
            return <FaCashRegister size="20px" />

          case 'Payslip':
            return <FaMoneyBillWave size="20px" />

          case 'Statistics':
            return <FaChartArea size="20px" />

          default:
            return <FaInfinity size="20px" />
        }
      })()}
      {props.property}
    </button>
  )
}

export default MenuBarItem
