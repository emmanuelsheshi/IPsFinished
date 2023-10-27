import React from 'react'

import { useEffect, useState, useRef } from 'react'
import {
  FaArrowRight,
  FaDatabase,
  FaFastBackward,
  FaFastForward,
  FaLongArrowAltRight,
  FaMailBulk,
  FaUsers,
} from 'react-icons/fa'
import axios from 'axios'
import './ExportPayRoll.css'
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import {
  construction_site_staff,
  essentialDepartments,
  special_equipment_production,
  security,
  management,
  police,
  production_staff,
  empty,
} from './selectData'

import { useActive } from '../context/ActiveContext'
import { ErrorComponent } from '../components/ErrorComponent'

const sections = [
  ...construction_site_staff,
  ...essentialDepartments,
  ...management,
  ...police,
  ...security,
  ...special_equipment_production,
  ...production_staff,
]

const ExportPayRollComponent = () => {
  const [results, setResults] = useState([])
  const [remark, setRemark] = useState('')
  const [selected, setSelected] = useState({})
  const fieldsetRef = useRef()
  const { setActive } = useActive()
  const [error, setError] = useState({ state: 'hidden', message: '' })
  const [disabled, setDisabled] = useState(true)

  let data4export = []

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 22
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage

  const records = results.slice(firstIndex, lastIndex)
  const nPages = Math.ceil(results.length / recordsPerPage)
  const numbers = [...Array(nPages + 1).keys()].slice(1)

  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
  const fileExtension = '.xlsx'

  const exportToExcel = async (exelData, fileName) => {
    try {
      const ws = XLSX.utils.json_to_sheet(exelData)
      const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const data = new Blob([excelBuffer], { type: fileType })
      FileSaver.saveAs(data, fileName + fileExtension)
    } catch (e) {
      console.log(e)
    }
  }

  //export function ...>>>>

  const exportFx = () => {
    const selectedSectiions = []
    let gottenValues = []
    let valuesToExport = []

    const filterdData = [...fieldsetRef.current.children].filter((item) => {
      return item.childNodes[0].checked === true
    })

    filterdData.map((item, key) => {
      console.log(item.childNodes[0].value)
      selectedSectiions.push(item.childNodes[0].value)
    })

    selectedSectiions.forEach((value, key) => {
      const sectionFilter = results.filter((result) => {
        return result.section === value
      })

      valuesToExport.push(...sectionFilter)
    })

    valuesToExport.map((result, key) => {
      data4export[`${key}`] = {
        'Last Name': result.surname,
        'First Name': result.first_name,
        'Bank Code': result.bank_code,
        'Account Number': result.account_number,
        Amount: result.gross_pay,
        Remark: remark,
      }
    })

    exportToExcel(data4export, `${remark} payroll`)
  } // end of export

  // const url = 'http://localhost:3001/employees'
  const url = 'https://imperiumpayrollservice-bck.onrender.com/employees'

  useEffect(() => {
    setActive('Export Payroll')
    axios
      .get(url)
      .then((response) => {
        const data = response.data.searchResults
        setResults(data)
      })
      .catch((error) => {
        setError({ state: 'visible', message: 'no newtork' })
      })
  }, [])

  function prevPage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1)
    }
    if (currentPage <= 1) {
      setCurrentPage(1)
      // console.log(currentPage)
    }
  }

  function nextPage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage + 1)
    }

    if (currentPage >= nPages) {
      setCurrentPage(nPages)
      // console.log(currentPage)
    }
  }

  function changeCpage(id) {
    setCurrentPage(id)
  }

  let selectedThings = [{ value: '' }]

  const selectAll = () => {
    ;[...fieldsetRef.current.children].forEach((item, key) => {
      item.childNodes[0].checked = true
    })

    // const things = document.querySelector('.gridTins').children
    // const thingsSearch = [...things]
    // thingsSearch.forEach((item, key) => {
    //   item.childNodes[0].value = true
    // })
  }

  const clearAll = () => {
    ;[...fieldsetRef.current.children].forEach((item, key) => {
      item.childNodes[0].checked = false
    })
  }

  return (
    <div className="main_page">
      <ErrorComponent props={{ state: error.state, message: error.message }} />
      <fieldset className="section_things" name="fieldset">
        <legend>Choose Departments</legend>

        <div className="gridTins" ref={fieldsetRef}>
          {sections.map((section, key) => {
            return (
              <div>
                <input
                  type="checkbox"
                  value={section.value}
                  name={section.label}
                  key={key}
                />
                <label for={section.value}>{section.value}</label>
              </div>
            )
          })}
        </div>
        <div className="fieldset_controls">
          <button onClick={selectAll}>select all</button>
          <button onClick={clearAll}>clear all</button>
        </div>
      </fieldset>
      <div className="thingsIntro">
        <div className="stats">
          <FaUsers color="red" /> <b>{results.length}</b>
        </div>
        <div className="remark_container">
          <input
            className="input_remark"
            type="text"
            placeholder="input remark"
            onChange={(e) => {
              setRemark(e.target.value)
            }}
          />
          <button
            className="remark_button"
            onClick={() => {
              setRemark('')
            }}
          >
            clear
          </button>
        </div>
      </div>

      <table className="table">
        <tr>
          <th>s/n</th>

          <th>Department</th>

          <th>First Name</th>
          <th>Last Name</th>
          <th>Bank code</th>
          <th>Account number</th>
          <th>Amount</th>
          <th>Remark</th>
          <th>Section</th>
        </tr>

        {typeof results === 'undefined' ? (
          <p>nothing found</p>
        ) : (
          records.map((result, key) => {
            result.remark = remark

            return (
              <tr key={key}>
                <td>{key + 1}</td>

                <td>{result.section}</td>
                <td>{result.surname} </td>
                <td>{result.first_name} </td>
                <td>{result.bank_code} </td>
                <td>{result.account_number} </td>
                <td>{result.gross_pay} </td>
                <td>{result.remark}</td>
                <td>{result.department}</td>
              </tr>
            )
          })
        )}
      </table>
      <div className="bottom_buttons">
        <button
          className="export_button"
          onClick={exportFx}
          // disabled={disabled}
        >
          <FaMailBulk color="white" /> {'     '} <FaLongArrowAltRight />
        </button>

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
    </div>
  )
}

export default ExportPayRollComponent
