import React from 'react'
import questions from './questions'
import './QuestionCard.css'

function QuestionCard({question, options, addScore, i}) {
  return (
    <div className='question-card'>
      <div className='question-content'>
        <h1>{question}</h1>
        <div className='options'>
            {options.map((answer, index)=>(
                <button className='question-button' key={i} onClick={() => addScore(answer.type)}>
                    {answer.text}
                </button>
            ))}
        </div>
      </div>
        
    </div>
  )
}

export default QuestionCard