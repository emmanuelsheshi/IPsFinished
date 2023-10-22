import React from 'react'
import './PaySlipComponent.css'

import { useLocation } from 'react-router-dom'

export const PaySlipComponent = () => {
  const location = useLocation()

  const data = location.state

  console.log(location.state)

  return (
    <div className="pay_slip_page">
      <div className="pay_content">
        <h4>payslip</h4>
        {/* <img className="company_logo" src="./images/imperium logo.svg" alt="" /> */}
        <table className="pay_slip_table">
          <tr>
            <th>employee Image</th>
            <td>
              <img className="employee_image" src={`${data.imageUrl}`} alt="" />
            </td>
          </tr>

          <tr>
            <th>Employee Name</th>
            <td>{data.first_name}</td>
          </tr>
          <tr>
            <th>Employee Surname</th>
            <td>{data.surname}</td>
          </tr>

          <tr>
            <th>Department</th>
            <td>{data.department}</td>
          </tr>

          <tr>
            <th>Section</th>
            <td>{data.section}</td>
          </tr>

          <tr>
            <th>Date of Employment</th>
            <td>{data.date_of_employment}</td>
          </tr>

          <tr>
            <th>Yearly Salary</th>
            <td>{data.gross_pay * 12}</td>
          </tr>

          <div>
            employee signature:<hr></hr>
          </div>
          <div>
            director signature:<hr></hr>
          </div>
        </table>
      </div>
    </div>
  )
}
