import React, { useEffect } from 'react'
import { useState } from 'react'
import './AddEmployee.css'
import axios from 'axios'
import FormData from 'form-data'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import * as Loader from 'react-loader-spinner'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

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

const UpdateEmployeeComponent = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // console.log(location.state)

  const [dept, setDept] = useState(location.state.department)
  const [data, setData] = useState([])
  const [image, setImage] = useState('')
  const [bank, setBank] = useState([{}])

  const LoadingIndicator = (props) => {
    const { promiseInProgress } = usePromiseTracker()
    return promiseInProgress && <Loader.TailSpin />
  }

  useEffect(() => {
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

  useEffect(() => {
    console.log('the form data is changed')
    console.log(location.state.section, '----->>>')
    document.querySelector('.firstname').value = location.state.first_name
    document.querySelector('.surname').value = location.state.surname
    document.querySelector('.phone').value = location.state.phone
    document.querySelector('.address').value = location.state.address
    document.querySelector('.employment_status').value =
      location.state.employment_status
    document.querySelector('.employment_status').value =
      location.state.employment_status
    document.querySelector('.department').value = location.state.department
    document.querySelector('.section').value = location.state.section

    document.querySelector('.job_description').value =
      location.state.job_description

    document.querySelector('.date_of_employment').value =
      location.state.date_of_employment

    document.querySelector('.account_number').value =
      location.state.account_number

    document.querySelector('.bank_name').value = location.state.bank_name
    document.querySelector('.bank_code').value = location.state.bank_code
    document.querySelector('.gross_pay').value = location.state.gross_pay
    // document.querySelector('.upload').value = location.state.imageUrl
  }, FormData)

  useEffect(() => {
    document.querySelector('.section').value = location.state.section
  })

  const promiseHandler = async (url, payload) => {
    try {
      const res = await axios.post(`${url}`, payload)
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
    // formData.append('file', image)

    const payload = Object.fromEntries(formData)
    console.log(payload)

    // const url = 'http://localhost:3001/update'
    const url = 'https://imperiumpayrollservice-bck.onrender.com/update'

    trackPromise(promiseHandler(url, payload)).finally(() => {
      navigate('/employees')
    })
  } // end of handle submit

  return (
    <div className="main_content container">
      <LoadingIndicator className="loading" />
      <div className="userImage">
        <img
          className="ui"
          style={{
            borderRadius: '500px',
            objectFit: 'cover',
            width: '150px',
            height: 'auto',
          }}
          src={`${location.state.imageUrl}`}
          alt=""
        />
      </div>
      <form
        className="form_container"
        // encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
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
              <p>First name</p>
              <input
                type="text"
                name="firstname"
                className="firstname"
                required={true}
                onLoad={(e) => {
                  console.log('comp loaded')
                }}
              />
            </div>

            <div>
              <p>Surname</p>
              <input
                className="surname"
                type="text"
                name="surname"
                required={true}
              />
            </div>

            <div>
              <p>Phone</p>
              <input
                type="text"
                className="phone"
                name="phone"
                required={true}
              />
            </div>

            <div>
              <p>Address</p>
              <input
                type="text"
                className="address"
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
              className="employment_status"
              required={true}
            >
              {employment_status_options.map((status, key) => (
                <option key={key} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            <p>Deployment Section</p>
            <select
              required={true}
              className="department"
              name="department"
              onChange={(e) => setDept(e.target.value)}
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
              className="section"
              name="section"
              required={true}
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
              className="job_description"
              name="job_description"
            ></textarea>
            <p>date of employment</p>
            <input
              type="date"
              name="date_of_employment"
              className="date_of_employment"
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
              className="account_number"
              name="account_number"
              required={true}
            />
            <p>Bank Name</p>
            <select
              name="bank_name"
              className="bank_name"
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
              className="bank_code"
              type="text"
              name="bank_code"
              required={true}
              value={bank[0].code}
              // disabled={true}
            />
            <p>Gross Pay</p>
            <input
              type="number"
              className="gross_pay"
              name="gross_pay"
              required={true}
            />
            <p>Bonus</p>
            <input type="number" className="bonus" name="bonus" />
            <p>penalty</p>
            <input type="number" className="penalty" name="penalty" />
          </div>
          {/* <div className="content3">
            <input
              required={true}
              className="upload"
              type="file"
              name="upload"
              onChange={(e) => {
                setImage(URL.createObjectURL(e.target.files[0]))
              }}
            />
            <div className="image_preview">
              <img src={image} alt="" className="imagePrev" />
            </div>
          </div> */}
        </div>
        <input
          className="submit_button"
          type="submit"
          value="update"
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
        <div className="loading"></div>
      </form>
    </div>
  )
}

export default UpdateEmployeeComponent
