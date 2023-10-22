import React from 'react'
import './LoginComponent.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { FaInfo } from 'react-icons/fa'

import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import * as Loader from 'react-loader-spinner'

const LoginComponent = () => {
  const message = [
    'wrong email or passWord',
    'You have to login first',
    'network issues',
  ]
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()

  const [loggedIn, setLoggedIn] = useState({ login: 'none' })
  const [errorMesage, setErrorMessage] = useState({
    state: 'visible',
    message: message[1],
  })
  const navigate = useNavigate()

  const LoadingIndicator = (props) => {
    const { promiseInProgress } = usePromiseTracker()
    return promiseInProgress && <Loader.TailSpin />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit obb')

    const formData = new FormData(e.target)
    const payload = Object.fromEntries(formData)

    // const url = 'http://localhost:3001/login'
    const url = 'https://imperiumpayrollservice-bck.onrender.com/login'

    trackPromise(
      axios
        .post(url, payload)
        .then((response) => {
          setLoggedIn(response.data)

          console.log(response.data)

          if (response.data.login) {
            setAuthUser({ user: 'confirmed' })
            navigate('/')
          } else {
            console.log('cant log you in')
            setAuthUser({ user: 'user' })
            navigate('/login')
            setErrorMessage({ state: 'visible', message: message[0] })
          }
        })
        .catch((e) => {
          console.log(e, 'network error')
          setErrorMessage({ state: 'visible', message: message[2] })
        }),
    )

    //send to back end
  }

  return (
    <div className="login_page">
      <div className="login_form_container">
        <div className="main_form_container">
          <form
            onSubmit={(e) => {
              handleSubmit(e)
            }}
            className="form"
          >
            <div className="divCont">
              <p>Email</p>
              <input
                onChange={() => {
                  setErrorMessage({ state: 'hidden', message: '' })
                }}
                className="login_input"
                type="email"
                placeholder="example@gmail.com"
                name="email"
              />
            </div>

            <div className="divCont">
              <p>Password</p>
              <input
                onChange={() => {
                  setErrorMessage({ state: 'hidden', message: '' })
                }}
                className="login_input"
                type="password"
                name="password"
                required={true}
              />
            </div>

            <p></p>

            <button className=" login_submit" type="submit" required={true}>
              login{' '}
            </button>
            <p className="reg">
              <a href="#">register</a> new account
            </p>
            <LoadingIndicator className="loading" />
            <div
              style={{
                width: '60%',
                height: '10%',
                color: 'white',
                background: '#ff2400c2',
                borderRadius: '1px',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '11px',
                position: 'relative',

                visibility: `${errorMesage.state}`,
              }}
              onClick={(e) => {
                e.target.style.visibility = 'hidden'
              }}
            >
              {' '}
              <FaInfo />
              {`${errorMesage.message}`}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
