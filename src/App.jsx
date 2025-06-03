import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [summary, setSummary] = useState([]);

  const handleFinish = (finalScore, answers) => {
    setScore(finalScore);
    setSummary(answers);
    setFinished(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz App</h1>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {finished
        ? <Result score={score} answers={summary} />
        : <Quiz onFinish={handleFinish} />}
    </div>
    </div>
  );
}

export default App;
