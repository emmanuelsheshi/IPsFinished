import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import axios from 'axios'
import Department from '../components/Department'
import * as data from '../pages/selectData'
import SectionChart from '../components/SectionChart'
import { ErrorComponent } from '../components/ErrorComponent'

import { useActive } from '../context/ActiveContext'

import {
  FaMoneyCheck,
  FaMoneyBillWaveAlt,
  FaUser,
  FaUserSecret,
  FaUsersCog,
  FaUserFriends,
} from 'react-icons/fa'

const DashBoardPage = ({ props }) => {
  const [results, setResults] = useState([])
  const [error, setError] = useState({ state: 'hidden', message: '' })
  const { active, setActive } = useActive()

  let mouseX,
    mouseY = 0

  let sum = 0

  let information = {}
  let hoveredBox = 0

  const sections = [
    ...data.construction_site_staff,
    ...data.essentialDepartments,
    ...data.management,
    ...data.police,
    ...data.security,
    ...data.special_equipment_production,
    ...data.production_staff,
  ]

  const deploymentSection = data.sectionByLocation

  //hover created here

  const getBox = (whichBox, info) => {
    information = info
    hoveredBox = whichBox

    const hovBox = document.querySelector('.hoverBox')
    const hoverState = information.hoverState
    const glaceStats = document.querySelector('.glance_stats')

    // console.log(mouseX, mouseY)

    if (hovBox === null) {
    } else {
      if (hoverState === 1) {
        hovBox.style.visibility = 'visible'

        mouseX = information.mousePosition.x
        mouseY = information.mousePosition.y
        hovBox.style.left = `${mouseX - 60}px`
        hovBox.style.top = `${mouseY - 110}px`

        hovBox.style.transition = 'left 0.5s ease, top 0.5s ease'
      } else {
        hovBox.style.visibility = 'hidden'
      }

      information.section === undefined
        ? (hovBox.innerHTML = '<p></p>')
        : (hovBox.innerHTML = `<p>  ${
            information.section
          }</p><p> section salary: <span style="color:black;"> &#x20A6; ${information.sum.toLocaleString(
            'en',
            { useGrouping: true },
          )}</span></p><p>${information.staffNumber} staff</p>`)
    }
  } // end of fx

  // const url = 'http://localhost:3001/employees'
  const url = 'https://imperiumpayrollservice-bck.onrender.com/employees'

  useEffect(() => {
    setActive('Dashboard')
    axios
      .get(url)
      .then((response) => {
        const data = response.data.searchResults

        setResults(data)
      })
      .catch((err) => {
        console.log('error ')
        setError({ state: 'visible', message: 'no newtork' })
      })
  }, [])

  const payArray = results.map((result, key) => {
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

  return (
    <div className="dash_page">
      <ErrorComponent props={{ state: error.state, message: error.message }} />
      <div className="departments">
        {deploymentSection.map((department, key) => {
          return (
            <Department
              key={key}
              props={{
                department: department.label,
                image: key,
                data: results,
              }}
            />
          )
        })}
      </div>
      <div className="departments_pay_chart">
        <div
          className="hoverBox"
          style={{
            width: 'fit-content',

            position: 'absolute',
            background: 'white',
          }}
          onClick={(e) => {
            e.target.style.visibility = 'hidden'
          }}
        >
          {' '}
        </div>
        <div className="section_title">
          <p>Department Statistics at a glance</p>
        </div>
        <div
          className="total_salary"
          style={{ color: 'rgb(86, 86, 86)', marginLeft: '2%' }}
        >
          <p>
            {' '}
            <FaMoneyBillWaveAlt /> &#x20A6; {sum.toLocaleString()}
          </p>
          <p>
            <FaUserFriends /> {results.length}
          </p>
        </div>

        <div className="graph">
          {sections.map((section, key) => {
            return (
              <SectionChart
                key={key}
                props={{
                  section: section.label,
                  data: results,
                  key: key,
                  getBoxRef: getBox,
                }}
              ></SectionChart>
            )
          })}
        </div>
      </div>

      <div className="content_footer">
        {/* <h1>Payrol management system </h1> */}
        <div className="footer_footer">
          <div className="foot">
            <p>© Imperium Industires Payroll 2023</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoardPage
