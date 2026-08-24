import { fireEvent, render, screen, within } from '@testing-library/react';
import App, { getWinningType, pokemonTypes } from './App';
import personalityData from './components/personalityDescriptions';
import questions from './components/questions';

test('starts on the introduction and opens the quiz', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /which pokémon matches your vibe/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /start the quiz/i }));

  expect(screen.getByText(`Question 1 of ${questions.length}`)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: questions[0].question })).toBeInTheDocument();
});

test('completes the quiz and can start a fresh retake', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /start the quiz/i }));

  questions.forEach(() => {
    const choices = within(screen.getByRole('group', { name: /answer choices/i }));
    fireEvent.click(choices.getAllByRole('button')[0]);
  });

  expect(screen.getByRole('heading', { name: 'ODDISH' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /retake quiz/i }));

  expect(screen.getByText(`Question 1 of ${questions.length}`)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: questions[0].question })).toBeInTheDocument();
});

test('can undo an answer and return to the previous question', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /start the quiz/i }));

  const firstBackButton = screen.getByRole('button', { name: /previous question/i });
  expect(firstBackButton).toBeDisabled();

  let choices = within(screen.getByRole('group', { name: /answer choices/i }));
  fireEvent.click(choices.getByRole('button', { name: /hiking in nature/i }));
  expect(screen.getByRole('heading', { name: questions[1].question })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /previous question/i }));
  expect(screen.getByRole('heading', { name: questions[0].question })).toBeInTheDocument();

  choices = within(screen.getByRole('group', { name: /answer choices/i }));
  fireEvent.click(choices.getByRole('button', { name: /beach trip/i }));
  expect(screen.getByRole('heading', { name: questions[1].question })).toBeInTheDocument();
});

test('can change the final answer from the result screen', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /start the quiz/i }));

  questions.forEach(() => {
    const choices = within(screen.getByRole('group', { name: /answer choices/i }));
    fireEvent.click(choices.getAllByRole('button')[0]);
  });

  fireEvent.click(screen.getByRole('button', { name: /change last answer/i }));
  expect(screen.getByText(`Question ${questions.length} of ${questions.length}`)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: questions.at(-1).question })).toBeInTheDocument();
});

test('uses the most recent tied answer as the tie-breaker', () => {
  const scores = Object.fromEntries(pokemonTypes.map(type => [type, 0]));
  scores.Fire = 2;
  scores.Water = 2;

  expect(getWinningType(scores, ['Fire', 'Water'])).toBe('Water');
  expect(getWinningType(scores, ['Water', 'Fire'])).toBe('Fire');
});

test('balances every result type and keeps question data valid', () => {
  const typeCounts = Object.fromEntries(pokemonTypes.map(type => [type, 0]));

  questions.forEach(({ options }) => {
    expect(new Set(options.map(option => option.type)).size).toBe(options.length);

    options.forEach(({ type }) => {
      expect(personalityData[type]).toBeDefined();
      typeCounts[type] += 1;
    });
  });

  expect(typeCounts).toEqual(
    Object.fromEntries(pokemonTypes.map(type => [type, 6]))
  );
});
