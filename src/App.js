import { useState } from 'react';
import './App.css';
import Intro from './components/Intro';
import questions from './components/questions';
import QuestionCard from './components/QuestionCard';
import Result from './components/Result';

export const pokemonTypes = [
  'Fire',
  'Water',
  'Grass',
  'Electric',
  'Psychic',
  'Fairy',
  'Fighting',
  'Ghost',
  'Normal',
  'Flying'
];

const createInitialScores = () =>
  Object.fromEntries(pokemonTypes.map(type => [type, 0]));

export function getWinningType(scores, answerHistory = []) {
  const maxScore = Math.max(...Object.values(scores));
  const tiedTypes = Object.entries(scores)
    .filter(([, score]) => score === maxScore)
    .map(([type]) => type);

  // In a tie, prefer the user's most recent answer among the tied types.
  return [...answerHistory]
    .reverse()
    .find(type => tiedTypes.includes(type)) || tiedTypes[0] || '';
}

function App() {
  const [scores, setScores] = useState(createInitialScores);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [introScreen, setIntroScreen] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(0);

  const addScore = elementType => {
    setScores(currentScores => ({
      ...currentScores,
      [elementType]: currentScores[elementType] + 1
    }));
    setAnswerHistory(currentHistory => [...currentHistory, elementType]);
    setQuestionNumber(currentQuestion => currentQuestion + 1);
  };

  const goBack = () => {
    if (questionNumber === 0 || answerHistory.length === 0) return;

    const previousType = answerHistory[answerHistory.length - 1];

    setScores(currentScores => ({
      ...currentScores,
      [previousType]: Math.max(0, currentScores[previousType] - 1)
    }));
    setAnswerHistory(currentHistory => currentHistory.slice(0, -1));
    setQuestionNumber(currentQuestion => Math.max(0, currentQuestion - 1));
  };

  const restartQuiz = () => {
    setScores(createInitialScores());
    setAnswerHistory([]);
    setQuestionNumber(0);
    setIntroScreen(false);
  };

  const quizComplete = questionNumber >= questions.length;
  const finalWinner = quizComplete
    ? getWinningType(scores, answerHistory)
    : '';

  return (
    <main className="content">
      {introScreen ? (
        <Intro hideIntro={() => setIntroScreen(false)} />
      ) : !quizComplete ? (
        <QuestionCard
          key={questionNumber}
          question={questions[questionNumber].question}
          options={questions[questionNumber].options}
          addScore={addScore}
          onBack={goBack}
          canGoBack={questionNumber > 0}
          questionNumber={questionNumber + 1}
          totalQuestions={questions.length}
        />
      ) : (
        <Result
          resultType={finalWinner}
          onBack={goBack}
          onRestart={restartQuiz}
        />
      )}
    </main>
  );
}

export default App;
