import React, { useEffect } from 'react'
import { useState } from 'react'
import './AddEmployee.css'
import axios from 'axios'
import FormData from 'form-data'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import * as Loader from 'react-loader-spinner'
import ProgressBar from '../components/ProgressBar'
import { useActive } from '../context/ActiveContext'

import {
  employment_status_options,
  departments,
  construction_site_staff,
  essentialDepartments,
  special_equipment_production,
  security,
  management,
  police,
  production_staff,
  empty,
  bankNames,
  sectionByLocation,
  hqSection,
  specialEquipmentSection,
  siteSection,
} from './selectData'

// console.log({ sections })

const AddEmployeeComponent = () => {
  const [dept, setDept] = useState('HQ')
  const [data, setData] = useState(essentialDepartments)
  const [image, setImage] = useState('')
  const [bank, setBank] = useState([
    {
      name: 'Parallex MFB',
      code: '015',
    },
  ])
  const [ballPosition, setBallPosition] = useState('0')

  const { setActive } = useActive()

  const LoadingIndicator = (props) => {
    const { promiseInProgress } = usePromiseTracker()
    return promiseInProgress && <Loader.FallingLines />
  }

  useEffect(() => {
    setActive('Create Employee')

    if (dept === 'HQ') {
      setData(hqSection)
    } else if (dept === 'SITE') {
      setData(siteSection)
    } else if (dept === 'SPECIAL EQUIPMENT') {
      setData(specialEquipmentSection)
    } else {
      setData(empty)
    }
  }, [dept])

  const promiseHandler = async (url, payload) => {
    try {
      const res = await axios.post(`${url}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(res, '--->>> promise is resolved')
      return res
    } catch (err) {
      return 'error not working'
    }
  }

  // on submit shitttttt
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('you just submitted')

    const formData = new FormData(e.target)
    formData.delete('uploadPix')
    formData.append('file', image)

    const payload = Object.fromEntries(formData)
    // const url = 'http://localhost:3001/new_user'

    const url = 'https://imperiumpayrollservice-bck.onrender.com/new_user'

    trackPromise(promiseHandler(url, payload))

    // resset form
    document.querySelector('.form_container').reset()
    setBallPosition('0')
    setImage('')
  } // end of handle submit

  /// view begins here
  return (
    <div className="main_content ">
      <ProgressBar props={{ ballPosition: ballPosition }} />
      <form
        className="form_container"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="loading">
          <LoadingIndicator className="loading" />
        </div>

        <div className="inner_form">
          <div className="content1">
            <img
              src="./images/1.svg"
              style={{
                position: 'absolute',
                top: '90px',
                left: '170px',

                zIndex: '-1',
              }}
              alt=""
            />
            {/* <p>Personal Info</p> */}
            <div>
              <p>First name </p>
              <input
                type="text"
                onChange={(e) => {
                  setBallPosition('1')
                }}
                name="firstname"
                required={true}
              />
            </div>

            <div>
              <p>Surname</p>
              <input
                type="text"
                name="surname"
                required={true}
                onChange={(e) => {
                  setBallPosition('7')
                }}
              />
            </div>

            <div>
              <p>Phone</p>
              <input
                onChange={(e) => {
                  setBallPosition('14')
                }}
                type="text"
                name="phone"
                required={true}
              />
            </div>

            <div>
              <p>Address</p>
              <input
                onChange={(e) => {
                  setBallPosition('21')
                }}
                type="text"
                name="address"
                required={true}
              />
            </div>
          </div>

          <div className="content2">
            <img
              src="./images/2.svg"
              style={{
                position: 'absolute',
                top: '-20px',
                left: '550px',
                zIndex: '-1',
              }}
              alt=""
            />
            {/* <p>Company Info</p> */}
            <p>Employment status</p>
            <select
              name="employment_status"
              onChange={(e) => {
                setBallPosition('28')
              }}
            >
              {employment_status_options.map((status, key) => (
                <option key={key} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            <p>Deployment Section</p>
            <select
              className="custom-select sources"
              name="department"
              onChange={(e) => {
                setDept(e.target.value)
                setBallPosition('35')
              }}
            >
              {sectionByLocation.map((department, key) => (
                <option key={key} value={department.value}>
                  {department.label}
                </option>
              ))}
            </select>
            <p>Department</p>
            <select
              id="sources"
              className="custom-select sources"
              name="section"
              onChange={(e) => {
                setBallPosition('42')
              }}
            >
              {data.map((data, key) => {
                return (
                  <option key={key} value={data.value}>
                    {data.label}
                  </option>
                )
              })}
            </select>
            <p>Job Description</p>
            <textarea
              cols="25"
              onChange={(e) => {
                setBallPosition('49')
              }}
              name="job_description"
            ></textarea>
            <p>date of employment</p>
            <input
              type="date"
              name="date_of_employment"
              onChange={(e) => {
                setBallPosition('56')
              }}
            />
          </div>
          <div className="content4">
            {/* <p>Financial Info</p> */}
            <img
              src="./images/3.svg"
              style={{
                position: 'absolute',
                top: '-90px',
                left: '950px',
                zIndex: '-1',
              }}
              alt=""
            />

            <p>Account Number</p>
            <input
              type="text"
              name="account_number"
              required={true}
              onChange={(e) => {
                setBallPosition('63')
              }}
            />
            <p>Bank Name</p>
            <select
              name="bank_name"
              required={true}
              onChange={(e) => {
                setBank(
                  bankNames.filter((bankName) => {
                    return bankName.name === e.target.value
                  }),
                )
              }}
            >
              {bankNames.map((bankName, key) => (
                <option key={key} value={bankName.name}>
                  {bankName.name}
                </option>
              ))}
            </select>
            <p>Bank Code</p>
            <input
              type="text"
              name="bank_code"
              required={true}
              // disabled={true}
              value={bank[0].code}
            />
            <p>Gross Pay</p>
            <input
              type="number"
              name="gross_pay"
              required={true}
              onChange={(e) => {
                setBallPosition('70')
              }}
            />
          </div>
          <div className="content3">
            {/* <p>Image</p> */}
            <input
              required={true}
              className="upload"
              type="file"
              name="upload"
              onChange={(e) => {
                setImage(URL.createObjectURL(e.target.files[0]))
                setBallPosition('100')
              }}
            />
            <div className="image_preview">
              <img src={image} alt="" className="imagePrev" />
              {/* <p>image</p> */}
            </div>
          </div>
        </div>
        <input
          className="submit_button"
          type="submit"
          value="save"
          style={{
            width: '30%',
            height: '40px',
            marginLeft: '30%',
            marginTop: '5%',
            background: '#098FA6',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        />
      </form>
    </div>
  )
}

export default AddEmployeeComponent
