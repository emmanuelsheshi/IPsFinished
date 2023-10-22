import React, { useState } from 'react'
import { FaCheckDouble } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const SectionChart = ({ props }) => {
  const navigate = useNavigate()
  const [whichBox, setWhichBox] = useState(0)
  const [info, setInfo] = useState({})
  const [hoverState, setHoverState] = useState(0)
  const section = props.section
  let data = props.data
  let sum = 0

  const sectionFilter = data.filter((result) => {
    return result.section === section
  })

  const payArray = sectionFilter.map((result, key) => {
    return result.gross_pay
  })

  const getPay = [...payArray]
  if (getPay.length > 0) {
    sum = getPay.reduce((sum, a) => {
      return sum + a
    })
  } else {
    sum = 0
  }

  const sectionDataNumber = [...sectionFilter].length

  props.getBoxRef(whichBox, info)

  return (
    <div
      style={{ position: 'relative' }}
      onClick={() => {
        navigate('/show_section', {
          state: sectionFilter,
        })
      }}
    >
      <div
        style={{
          fontSize: '8px',
          rotate: '-90deg',
          position: 'absolute',
          top: '0px',
          fontWeight: 'light',
        }}
      >
        {' '}
        {sum !== 0 ? (
          <p>&#x20A6; {sum.toLocaleString('en', { useGrouping: true })} </p>
        ) : (
          ''
        )}{' '}
      </div>
      <div
        onMouseOver={(e) => {
          setHoverState(1)
          setWhichBox(props.key)
          let x = e.pageX
          let y = e.pageY

          setInfo({
            key: props.key,
            sum: sum,
            section: section,
            hoverState: hoverState,
            staffNumber: sectionDataNumber,
            mousePosition: { x: x, y: y },
          })
        }}
        style={{
          width: `1.5vw`,
          height: sum !== 0 ? `${Number(sum) / 90000 + 60}px` : '20px',
          background: '#098FA6',

          transition: ['height 2s linear'],

          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
        }}
      >
        {/* <input type="checkbox" /> */}
        <p
          style={{
            fontSize: '8px',
            lineHeight: '7px',
            color: 'white',
            position: 'absolute',
            bottom: '0px',
            left: '0px',
          }}
        >
          {section.slice(0, 3)}
        </p>
      </div>
    </div>
  )
}

export default SectionChart
