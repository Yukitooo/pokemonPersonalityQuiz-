import React from 'react'
import './Ready.css'

function Ready(onReady) {
  return (
    <>
        <div className='ready'>  
            <h1>Your inner pokemon have chosen you!</h1>
            <button className='start-btn' onClick={onReady}>Reveal!</button>
        </div>
    </>
  )
}

export default Ready