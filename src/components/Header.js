import React, { useEffect, useState } from 'react'
import './Header.css'
import SearchBarCompnent from './SearchBar'

import { useAuth } from '../context/AuthContext'

const HeaderComponent = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()
  const [searchBarStatus, setSearchBarStatus] = useState('visible')

  console.log(authUser)

  useEffect(() => {
    if (authUser.user === 'user') {
      setSearchBarStatus('hidden')
    } else {
      setSearchBarStatus('visible')
      // console.log('show now')
    }
  })

  return (
    <div className="header">
      <div className="searchBar" style={{ visibility: `${searchBarStatus}` }}>
        <SearchBarCompnent />
        {/* {'hdsfsdlfsdkfsdfsdhkl'} */}
      </div>
    </div>
  )
}

export default HeaderComponent
