import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SearchBarCompnent = () => {
  const [results, setResults] = useState()
  const [searchText, setSearchText] = useState('')
  const [textToSend, setTextToSend] = useState('')
  const navigate = useNavigate()

  const hangleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const payload = Object.fromEntries(formData)

    console.log(payload)
    console.log(formData)

    navigate('/search', { state: [payload.search_by, payload.search_query] })
    // document.querySelector('.searchBarThings').reset()
  }

  // view starts here..

  return (
    <div className="main_searchBox">
      <form className="searchBarThings" onSubmit={hangleSubmit}>
        <div className="selectButtons">
          <select name="search_by">
            <option style={{ fontSize: '10px' }} value="first_name">
              firstname
            </option>
            <option style={{ fontSize: '10px' }} value="surname">
              surname
            </option>
            <option style={{ fontSize: '10px' }} value="department">
              department
            </option>
            <option style={{ fontSize: '10px' }} value="section">
              section
            </option>
            <option style={{ fontSize: '10px' }} value="phone_number">
              phone number
            </option>

            {/* <option value="account_number">account number</option> */}
          </select>
        </div>
        <input
          className="search_query"
          name="search_query"
          type="text"
          required={true}
          placeholder="search employees"
          onInput={(e) => {
            setSearchText(e.target.value)
          }}
          // onKeyDown={(e) => {
          //   if (e.keyCode === 13) {
          //     setSearchText(e.target.value)
          //   }
          // }}
        />
        <input className="search_submit" type="submit" value={''} />
      </form>
    </div>
  )
}

export default SearchBarCompnent
