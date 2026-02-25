import { useEffect, useState } from "react";
import { data } from "./utils/gamedata";

const QuizApp = () => {
  console.log(data);

  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");
  const [display, setDisplay] = useState(false);
  const [index, setIndex] = useState(0);

  let currentQuestion = data[index];

  const fetchAnswer = (option) => {
    if (currentQuestion.correctAnswer !== option) {
      setError("Please try again!!");
      setDisplay(false);
    } else {
      setAnswer(option);
      setDisplay(true);
    }
  };

  const nextQuestion = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setAnswer("");
      setDisplay(false);
    } else {
      alert("quiz completed");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center py-2 mt-[-100px]">
      <h1 className="text-4xl font-bold mb-6">Quiz Game</h1>

      <div
        key={currentQuestion.id}
        className="bg-gray-800 rounded-lg p-6 mb-6 w-80 shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">
          {currentQuestion.question}
        </h2>

        <ul className="space-y-2 mb-4">
          {currentQuestion.options.map((option, index) => (
            <li
              key={index}
              onClick={() => fetchAnswer(option)}
              className="bg-gray-700 rounded-md p-2 cursor-pointer hover:bg-gray-600 transition"
            >
              {option}
            </li>
          ))}
          <p className="py-2 flex flex-col justify-center items-center text-xl font-sans  bg-white text-black w-30">
            {display ? `Correct ${answer} ✅ ` : error}
          </p>
        </ul>

        {display && (
          <button
            onClick={nextQuestion}
            className="mt-4 bg-green-500 text-white px-2 py-2 rounded "
          >
            Next Question →
          </button>
        )}
        
      </div>
    </div>
  );
};

export default QuizApp;
