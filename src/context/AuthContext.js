import React, { useState, useContext, useEffect } from 'react'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = (props) => {
  const [authUser, setAuthUser] = useState({ user: 'user' })
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const value = { authUser, setAuthUser, isLoggedIn, setIsLoggedIn }

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
}
