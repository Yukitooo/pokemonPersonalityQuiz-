import React from 'react'
import './Intro.css'
import pikachu from './pikachu.gif'

function Intro({hideIntro}) {
  return (
    <section className='intro'>
        <div className="intro-copy">
            <p className="eyebrow">✨ Pokémon personality match</p>
            <h1 className='heading'>Which Pokémon matches your vibe?</h1>
            <p className="intro-description">Answer a few playful questions and meet the Pokémon that shares your energy.</p>
            <div className="intro-details" aria-label="Quiz details">
                <span>15 questions</span>
                <span>Under 5 minutes</span>
                <span>10 possible matches</span>
            </div>
            <button className='btn' type="button" onClick={hideIntro}>
                Start the quiz <span aria-hidden="true">→</span>
            </button>
        </div>
        <div className="intro-visual" aria-hidden="true">
            <div className="pikachu-glow" />
            <img src={pikachu} alt="" />
            <span className="spark spark-one">✦</span>
            <span className="spark spark-two">✦</span>
            <span className="spark spark-three">●</span>
        </div>
    </section>
  )
}

export default Intro
