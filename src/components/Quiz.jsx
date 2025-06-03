import React, { useState, useEffect } from 'react';
import questionsData from '../data/questions';
import QuestionCard from './QuestionCard';
import Result from './Result';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30); // 30 sec for quiz
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5)); // select 5 random questions
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setShowResult(true);
    }
    const timer = timeLeft > 0 && setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (selected) => {
    const correct = questions[index].answer;
    if (selected === correct) setScore(score + 1);
    setAnswers([...answers, { question: questions[index].question, selected, correct }]);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setShowResult(true);
    }
  };

  if (questions.length === 0) return <div>Loading...</div>;
  if (showResult) return <Result score={score} answers={answers} />;

  return (
    <div>
      <div className="text-right mb-2 text-red-600">Time Left: {timeLeft}s</div>
      <QuestionCard
        question={questions[index]}
        index={index}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default Quiz;
