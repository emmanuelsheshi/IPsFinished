import React from 'react'
import './AllStaff.css'
import { useEffect, useState } from 'react'

import EmployeeCompment from './Employee'
import { FaFastBackward, FaFastForward, FaUsers } from 'react-icons/fa'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ErrorComponent } from '../components/ErrorComponent'

const SearchResultsComponent = () => {
  const [error, setError] = useState({ state: 'hidden', message: '' })
  const [results, setResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 8
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage

  const records = results.slice(firstIndex, lastIndex)
  const nPages = Math.ceil(results.length / recordsPerPage)
  const numbers = [...Array(nPages + 1).keys()].slice(1)

  const location = useLocation()

  console.log(location.state, '___after you have sent')

  // const url = 'http://localhost:3001/search'
  const url = 'https://imperiumpayrollservice-bck.onrender.com/search'

  useEffect(() => {
    axios
      .post(url, { search: location.state })
      .then((response) => {
        const data = response.data.searchResults
        setResults(data)
      })
      .catch((error) => {
        setError({ state: 'visible', message: 'no newtork' })
      })
  })

  function prevPage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1)
    }
  }

  function nextPage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage + 1)
    }
  }

  function changeCpage(id) {
    setCurrentPage(id)
  }

  //---- view starts here

  return (
    <div className="content_page">
      <ErrorComponent props={{ state: error.state, message: error.message }} />
      {typeof results === 'undefined' ? (
        <p>nothing found</p>
      ) : (
        records.map((result, key) => {
          return (
            <EmployeeCompment props={result} key={key} className="things" />
          )
        })
      )}

      <div className="bottom_buttons">
        <div className="pagination">
          <button className="serverButton" onClick={prevPage}>
            <FaFastBackward />
          </button>
          <select name="" id="">
            {numbers.map((n, i) => {
              return (
                <option
                  key={i}
                  value={n}
                  onClick={() => {
                    setCurrentPage(n)
                  }}
                >
                  {n}
                </option>
              )
            })}
          </select>

          <button className="serverButton" onClick={nextPage}>
            <FaFastForward />
          </button>
        </div>
      </div>
      <div className="stats">
        <p style={{ position: 'absolute', fontSize: '15px' }}>
          <FaUsers /> {results.length}
        </p>
      </div>
    </div>
  )
}
export default SearchResultsComponent
