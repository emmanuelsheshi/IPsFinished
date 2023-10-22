import React from 'react'
import { useState } from 'react'
import { FaInfo } from 'react-icons/fa'

export function ErrorComponent({ props }) {
  return (
    <>
      <div
        style={{
          width: '20%',
          height: '6%',
          color: 'white',
          background: '#ff593f',

          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '11px',
          position: 'absolute',
          zIndex: 999999999,
          cursor: 'pointer',
          fontSize: '80%',

          top: 0,
          right: 0,

          visibility: `${props.state}`,
        }}
        onClick={(e) => {
          e.target.style.visibility = 'hidden'
        }}
      >
        {' '}
        <FaInfo />
        {/* <img src="./images/warning.svg" /> */}
        {`${props.message}`}
      </div>
    </>
  )
}
