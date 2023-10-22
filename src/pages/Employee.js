import React from 'react'
import './Employee.css'
import {
  FaChartPie,
  FaCoins,
  FaHammer,
  FaMoneyCheck,
  FaSlidersH,
  FaTrash,
} from 'react-icons/fa'

import { useNavigate } from 'react-router-dom'

const EmployeeCompment = ({ props }) => {
  const navigate = useNavigate()

  const getProps = () => {
    const myProp = props

    navigate('/update', { state: props })
  }

  const deleteUser = () => {
    navigate('/delete', { state: props })
  }

  const gotoPaySlip = () => {
    navigate('/payslip', { state: props })
  }

  return (
    <div className="employee-card">
      <div className="control">
        <button
          className="updateBtn"
          onClick={getProps}
          title={`update ${props.first_name}'s info`}
        >
          <FaSlidersH />
        </button>

        <button
          className="payslipBtn"
          onClick={gotoPaySlip}
          title={`${props.first_name}'s payslip`}
        >
          <FaMoneyCheck color="" />
        </button>

        <button
          className="deleteBtn"
          onClick={deleteUser}
          title={`delete ${props.first_name}`}
        >
          {' '}
          <FaTrash color="" />
        </button>
      </div>
      <p>
        {<b>{props.surname.toUpperCase()}</b>}, {props.first_name}
      </p>

      <div className="image_div">
        <img
          loading="lazy"
          className="imageDisplay"
          src={props.imageUrl}
          alt={props.imageUrl}
        />
      </div>

      <p>
        <FaCoins color=" #098fa6" size="10px" /> : <b>{props.gross_pay}</b>{' '}
        &#8358;
      </p>
      <p>
        {' '}
        <FaHammer color=" #098fa6" size="10px" /> : {props.department}
      </p>

      <p style={{ fontSize: '10px' }}>
        <FaChartPie color=" #098fa6" size="10px" /> <b>{props.section}</b>
      </p>
    </div>
  )
}

export default EmployeeCompment
