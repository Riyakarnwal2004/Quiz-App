import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Result = ({ score, answers }) => {
  const total = answers.length;
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="sm:w-2xl sm:mx-auto sm:p-6 bg-white sm:rounded-xl sm:shadow-md sm:space-y-6 sm:mt-8 sm:text-xl  mt-4 rounded-xl p-4 m-4 ">
      <div className="flex flex-col items-center">
        <h2 className="sm:text-3xl text-xl font-bold text-blue-600 mb-4">Quiz Completed! 🎉</h2>
        <div className="w-40 h-40 mb-4">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textColor: '#1d4ed8',
              pathColor: '#10b981',
              trailColor: '#d1d5db',
              textSize: '18px',
            })}
          />
        </div>
        <p className="text-lg font-semibold text-gray-700">
          You got <span className="text-green-600">{score}</span> out of <span className="text-blue-600">{total}</span> correct.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-800">Answer Summary</h3>
        <ul className="space-y-4 text-xl">
          {answers.map((a, i) => (
            <li
              key={i}
              className="p-4 rounded-lg border-l-4 shadow-sm bg-gray-50"
              style={{
                borderColor: a.selected === a.correct ? "#22c55e" : "#ef4444"
              }}
            >
              <p className="font-medium text-gray-800 mb-1">
                <span className="text-blue-500">Q{i + 1}:</span> {a.question}
              </p>
              <p className={a.selected === a.correct ? "text-green-600" : "text-red-600"}>
                Your Answer: <strong>{a.selected}</strong>
              </p>
              {a.selected !== a.correct && (
                <p className="text-gray-700">Correct Answer: <strong>{a.correct}</strong></p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
          Retry Quiz 🔁
        </button>
      </div>
    </div>
  );
};

export default Result;
