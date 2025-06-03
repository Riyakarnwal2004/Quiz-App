import React from 'react';

const QuestionCard = ({ question, index, onAnswer }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="mb-4 font-semibold">Q{index + 1}. {question.question}</h2>
      <div className="grid gap-2">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(opt)}
            className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
