import React, { useRef, useState } from 'react';
import './QuestionCard.css';

function QuestionCard({
  question,
  options,
  addScore,
  onBack,
  canGoBack,
  questionNumber,
  totalQuestions
}) {
  const answerSubmitted = useRef(false);
  const [selectedType, setSelectedType] = useState('');

  const handleAnswer = type => {
    if (answerSubmitted.current) return;

    answerSubmitted.current = true;
    setSelectedType(type);
    addScore(type);
  };

  return (
    <section className='question-card' aria-labelledby="question-title">
      <div className='question-content'>
        <div className="quiz-header">
          <div>
            <p className="quiz-eyebrow">Pokémon Personality Quiz</p>
            <p className="progress-copy" aria-live="polite">Question {questionNumber} of {totalQuestions}</p>
          </div>
          <span className="question-count" aria-hidden="true">{questionNumber}/{totalQuestions}</span>
        </div>

        <div
          className="progress-track"
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin="1"
          aria-valuemax={totalQuestions}
          aria-valuenow={questionNumber}
        >
          <span style={{ width: `${(questionNumber / totalQuestions) * 100}%` }} />
        </div>

        <div className="question-heading">
          <p>Choose the answer that feels most like you</p>
          <h1 id="question-title">{question}</h1>
        </div>

        <div className='options' role="group" aria-label="Answer choices">
          {options.map((answer, index) => (
            <button
              className={`question-button ${selectedType === answer.type ? 'selected' : ''}`}
              key={answer.type}
              type="button"
              disabled={Boolean(selectedType)}
              onClick={() => handleAnswer(answer.type)}
            >
              <span className="answer-letter" aria-hidden="true">{String.fromCharCode(65 + index)}</span>
              <span>{answer.text}</span>
            </button>
          ))}
        </div>

        <div className="question-navigation">
          <button
            className="back-button"
            type="button"
            disabled={!canGoBack}
            onClick={onBack}
          >
            <span aria-hidden="true">←</span> Previous question
          </button>
          <p>Your previous score is undone when you go back.</p>
        </div>
      </div>
    </section>
  );
}

export default QuestionCard;
