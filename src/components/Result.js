import React from 'react'
import personalityData from './personalityDescriptions'
import './Result.css'

function Result({ resultType, onBack, onRestart }) {
  const result = personalityData[resultType];

  if (!result) return <p>Loading result...</p>;

  return (

    <section className="resultContainer" style={{ '--result-color': result.color }}>
        <div className="result-heading">
            <p>✨ Your personality match is...</p>
            <h2>Meet your inner Pokémon</h2>
        </div>

        <article className="resultContent">
            <div className="leftSide">
                <div className="result-image-wrap">
                    <span className="result-orbit" aria-hidden="true" />
                    <img src={`${process.env.PUBLIC_URL}/${result.image}`} alt={result.name} />
                </div>
                <span className="type-badge">{result.type} type</span>
                <h1>{result.name}</h1>
                <p className="tagline">{result.tagline}</p>
            </div>
            <div className="rightSide">
                <p className="result-summary-label">Why this match fits you</p>
                <ul>
                    {result.description.map(desc => (
                        <li key={desc}>{desc}</li>
                    ))}
                </ul>
                <div className="result-actions">
                    <button className="changeAnswerButton" type="button" onClick={onBack}>← Change last answer</button>
                    <button className="retakeButton" type="button" onClick={onRestart}>Retake quiz ↻</button>
                </div>
            </div>
        </article>

        <footer className='watermark'>
            <p>Developed by Yuki</p>
            <a href="https://github.com/Yukitooo" target="_blank" rel="noopener noreferrer">View on GitHub ↗</a>
        </footer>
    </section>
    
  );
}

export default Result;
