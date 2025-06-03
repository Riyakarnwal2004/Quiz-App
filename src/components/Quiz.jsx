import React, { useState, useEffect } from 'react';
import questions from '../data/questions';

const Quiz = ({ onFinish }) => {
  const maxQuestions = 5;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffled] = useState(() => [...questions].sort(() => 0.5 - Math.random()).slice(0, maxQuestions));
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);

  // Countdown timer logic
  useEffect(() => {
    if (currentIndex >= maxQuestions) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          handleAnswer(null); // time's up
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, [currentIndex]);

  const handleAnswer = (selected) => {
    const current = shuffled[currentIndex];

    const newAnswer = {
      question: current.question,
      selected: selected || "No Answer",
      correct: current.answer,
    };
    setAnswers(prev => [...prev, newAnswer]);

    if (currentIndex + 1 < maxQuestions) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(10); // reset timer
    } else {
      onFinish(
        [...answers, newAnswer].filter(a => a.selected === a.correct).length,
        [...answers, newAnswer]
      );
    }
  };

  const current = shuffled[currentIndex];

  return (
    <div className="max-w-xl sm:mx-auto p-6 bg-white rounded-xl shadow-md sm:space-y-6 m-6 space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-700">Question {currentIndex + 1} / {maxQuestions}</h2>
        <div className="text-red-600 font-semibold text-lg">
          ⏱️ {timeLeft}s
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-blue-600">{current.question}</h3>

      <div className="space-y-3 ">
        {current.options.map((option, idx) => (
          <button
            key={idx}
            className="w-full p-3 bg-gray-100 rounded-xl text-left hover:bg-blue-100 transition"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
