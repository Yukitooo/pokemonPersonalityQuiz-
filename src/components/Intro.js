import React from 'react'
import './Intro.css'
import pikachu from './pikachu.gif'

function Intro({hideIntro}) {
  return (
    <> 
        <div className='intro'>
            <img className='pikachu-dancing' src={pikachu}></img>
            <h1 className='heading'>WANT TO KNOW YOUR INNER POKEMON?</h1>
            <p>✨ Takes less than 5 minutes • Cute results guaranteed! ✨</p>
            <button className='btn' onClick={hideIntro}>Reveal My Pokemon!</button>
            
        </div>
    </>
  )
}

export default Intro