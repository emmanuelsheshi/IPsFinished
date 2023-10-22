import React, { useEffect, useState } from 'react'
import './Department.css'

import {
  FaCashRegister,
  FaChartPie,
  FaCoins,
  FaHammer,
  FaMonero,
  FaMoneyBill,
  FaSlidersH,
  FaTrash,
  FaUserCircle,
  FaUserFriends,
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Department = ({ props }) => {
  const navigate = useNavigate()
  const department = props.department.label
  let image = ''
  let data = props.data
  let sum = 0

  const departmentFilter = data.filter((result) => {
    return result.department === department
  })

  const payArray = departmentFilter.map((result, key) => {
    return result.gross_pay
  })

  const getPay = [...payArray]
  if (getPay.length > 0) {
    sum = getPay.reduce((sum, a) => {
      return sum + a
    })
  } else {
    sum = 0
  }

  const myData = [...departmentFilter].length

  switch (props.image) {
    case 0:
      image = '/images/essential.png'
      break
    case 1:
      image = '/images/police2.png'
      break
    case 2:
      image = '/images/security.png'
      break
    case 3:
      image = '/images/machining.png'
      break
    case 4:
      image = '/images/production.png'
      break
    case 5:
      image = '/images/construction.png'
      break

    case 6:
      image = '/images/management.png'
      break

    case 7:
      image = 'grey'
      break

    default:
      image = 'black'
  }

  return (
    <div
      className="department_card"
      onClick={() => {
        console.log('butnClicked')
        navigate('/show_department', {
          state: departmentFilter,
        })
      }}
    >
      <p className="department_title">{department}</p>

      <img src={`${image}`} alt="" />

      <p>
        <FaUserFriends size="9px" /> {myData}{' '}
        <span style={{ fontSize: '10px' }}>staff</span>
      </p>
      <FaMoneyBill size="10px" style={{ color: 'green' }} />
      <p
        style={{
          // color: 'red',
          fontSize: '13px',
          textShadow: '10px 1px  #0000',
        }}
      >
        &#x20A6; {sum.toLocaleString('en', { useGrouping: true })}
      </p>
    </div>
  )
}

export default Department
