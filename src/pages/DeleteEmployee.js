import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'

const DeleteEmployeeComponent = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/employees')
  }, [])

  const promiseHandler = async (url, payload) => {
    try {
      const res = await axios.post(`${url}`, payload)
      console.log(res, '--->>> promise is resolved')
      return res
    } catch (err) {
      return 'error not working'
    }
  }
  // const url = 'http://localhost:3001/employees'
  const url = 'https://imperiumpayrollservice-bck.onrender.com/delete'

  promiseHandler(url, location.state)

  return (
    <div>
      <h1>deleted</h1>
    </div>
  )
}

export default DeleteEmployeeComponent
