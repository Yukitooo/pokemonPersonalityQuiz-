import React, { use } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css'; 
import Intro from './components/Intro'
import questions from './components/questions'
import QuestionCard from './components/QuestionCard';
import Result from './components/Result';
import Ready from './components/Ready';

function App() {
  const [scores, setScores] = useState({
    Fire: 0,
    Water: 0,
    Grass: 0,
    Electric: 0,
    Psychic: 0,
    Fairy: 0,
    Fighting: 0,
    Ghost: 0,
    Normal: 0,
    Flying: 0
  });

  const [winner, setWinner] = useState([])
  const [finalWinner, setFinalWinner] = useState('')
  const [introScreen, setIntroScreen] = useState(true)
  const [questionNumber, setQuestionNumber] = useState(0)

  
  

  // Function to add score for the selected element type

 const add = (elementType) => {
  setScores(prevScores => ({
    ...prevScores, 
    [elementType]: prevScores[elementType]+1
  })); 

  setQuestionNumber(questionNumber+1); 

 }

 useEffect(() => {
  console.log('Score changed');
  Object.entries(scores).forEach((type, value) => {
    console.log(`${value} ${type}`);})
  const finalResult = () => {
    const maxScore = Math.max(...Object.values(scores));
    const winningTypes = Object.entries(scores)
      .filter(([type, score]) => score === maxScore)
      .map(([type]) => type);
    
    const final = winner.join();  
    setFinalWinner(final);
    setWinner(winningTypes);
    console.log(winner);
    return winningTypes;
 };

 finalResult();
 const x = finalResult()[0];

 console.log(x);
 setFinalWinner(x);
}, [scores]);


  const introHide = () => {
    setIntroScreen(!introScreen);
  };

  return (
    <>
      <div className='content'>

        {
  introScreen ? (
      <Intro hideIntro={introHide} />
    ) : questionNumber < questions.length ? (
      <QuestionCard
        key={questionNumber}
        question={questions[questionNumber].question}
        options={questions[questionNumber].options}
        addScore={add}
      />
    ) :  (
      
      <Result resultType={finalWinner} />
    )
}
        
     {/* <Ready/> */}
        
      </div>
      
    </>
  )
}

export default App