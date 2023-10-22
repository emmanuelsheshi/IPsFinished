import React from 'react'
import { useContext, useState } from 'react'

const IsActiveContext = React.createContext()

export const useActive = () => {
  return useContext(IsActiveContext)
}

export const IsActiveProvider = (props) => {
  const [active, setActive] = useState(false)

  const value = { active, setActive }

  return (
    <IsActiveContext.Provider value={value}>
      {props.children}
    </IsActiveContext.Provider>
  )
}
