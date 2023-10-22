import React from 'react'

const ProgressBar = ({ props }) => {
  const ballPos = props

  return (
    <>
      <div
        className="line"
        style={{
          position: 'relative',
          width: '90%',
          height: '0.5%',
          background: '#efefef',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          // background: 'blue',
        }}
      >
        <span
          className="lineFiller"
          style={{
            width: `${Number(ballPos.ballPosition)}%`,
            height: '100%',
            background: '#098fa6',
            borderRadius: '30px',
            transition: 'width 0.8s ease-in-out',
            position: 'relative',
          }}
        ></span>
        <span
          className="floating_ball"
          style={{
            position: 'absolute',
            padding: '0px',
            width: '20px',
            height: '20px',
            background: '#efefef',
            borderRadius: '30px',
            top: '-8px',
            left: `${Number(ballPos.ballPosition)}%`,
            transition: 'left 0.8s ease-in-out',
          }}
        ></span>
      </div>
    </>
  )
}

export default ProgressBar
