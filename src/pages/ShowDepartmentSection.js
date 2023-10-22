import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import './ExportPayRoll.css'
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import {
  FaArrowRight,
  FaDatabase,
  FaFastBackward,
  FaFastForward,
  FaLongArrowAltRight,
  FaMailBulk,
  FaUsers,
  FaPrint,
} from 'react-icons/fa'

import { useReactToPrint } from 'react-to-print'

const ShowSectionComponent = () => {
  const componentPDF = useRef()

  const location = useLocation()
  const [results, setResults] = useState([])
  const [remark, setRemark] = useState('')
  let data4export = []

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 9
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

  const exportFx = () => {
    results.map((result, key) => {
      data4export[`${key}`] = {
        'Last Name': result.surname,
        'First Name': result.first_name,
        'Bank Code': result.bank_code,
        'Account Number': result.account_number,
        Amount: result.gross_pay,
        Remark: remark,
      }
    })

    // const readyData = JSON.stringify(data4export)
    exportToExcel(data4export, `${remark} payroll`)
  } // end of export

  const generatePdf = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'userdata',
    // onAfterPrint: () => alert('you just printed'),
  })

  const printFx = () => {
    console.log('print here')
  }

  function prevPage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1)
    }
    if (currentPage <= 1) {
      setCurrentPage(1)
      console.log(currentPage)
    }
  }

  function nextPage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage + 1)
    }

    if (currentPage >= nPages) {
      setCurrentPage(nPages)
      console.log(currentPage)
    }
  }

  function changeCpage(id) {
    setCurrentPage(id)
  }

  useEffect(() => {
    setResults(location.state)
  }, [])

  // view is here

  return (
    <div className="main_page">
      <div className="remark_container">
        <input
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

      <table className="table" ref={componentPDF}>
        <tr>
          <th>section</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Bank code</th>
          <th>Account number</th>
          <th>Amount</th>
          <th>Remark</th>
          <th>image</th>
        </tr>

        {typeof results === 'undefined' ? (
          <p>nothing found</p>
        ) : (
          results.map((result, key) => {
            result.remark = remark

            return (
              <tr key={key}>
                <td>{result.section}</td>
                <td>{result.surname} </td>
                <td>{result.first_name} </td>
                <td>{result.bank_code} </td>
                <td>{result.account_number} </td>
                <td>{result.gross_pay} </td>
                <td>{result.remark}</td>
                <td>
                  <img
                    onMouseOver={(e) => {
                      e.target.style.position = 'absolute'
                      e.target.style.width = '6%'
                      // e.target.style.transition = 'width 0.3s ease-in-out'
                      e.target.style.zIndex = '+1'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.width = '50px'
                      // e.target.style.transition = 'width 0.3s ease-in-out'
                      e.target.style.position = 'relative'
                      e.target.style.zIndex = '0'
                    }}
                    src={`${result.imageUrl}`}
                    style={{
                      width: '50px',
                      borderRadius: '5px',
                      zIndex: '-1',
                      cursor: 'pointer',
                    }}
                    alt=""
                  />
                </td>
              </tr>
            )
          })
        )}
      </table>

      <div className="bottom_buttons">
        <button className="export_button" onClick={exportFx}>
          <FaMailBulk color="white" /> {'     '} <FaLongArrowAltRight />
        </button>

        <button className="export_button" onClick={generatePdf}>
          <FaPrint /> print
        </button>
      </div>
    </div>
  )
}

export default ShowSectionComponent
