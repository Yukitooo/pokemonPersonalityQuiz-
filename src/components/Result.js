import React from 'react'
import personalityData from './personalityDescriptions'
import './Result.css'

function Result({ resultType }) {
  const result = personalityData[resultType];

  if (!result) return <p>Loading result...</p>;

  return (
    <div className="resultContent" style={{ border: `1rem solid ${result.color}` }}>
      <div className="leftSide" style={{ borderRight: `2px ${result.color} solid` }}>
        <img src={`${process.env.PUBLIC_URL}/${result.image}`} alt={result.name} />
        <h1 style={{ color: result.color }} className="leftSideContent">{result.name}</h1>
        <h3 style={{ color: result.color }} className="leftSideContent">{result.type}</h3>
        <p className="leftSideContent tagline">{result.tagline}</p>
      </div>
      <div className="rightSide">
        {result.description.map((desc, index) => (
          <p key={index}>- {desc}</p>
        ))}
      </div>
    </div>
  );
}

export default Result;