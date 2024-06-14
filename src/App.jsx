import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import NavBar from "./components/NavBar";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedOptionRef = useRef();

  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions")
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const nextQuestion = () => {
    const selectedOption =
      selectedOptionRef.current.querySelector("input:checked");

    if (!selectedOption) {
      alert("Please select an answer");
    } else {
      console.log(selectedOption.value);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        selectedOption.checked = false; // Clear the selected option
      } else {
        console.log("Question End");
      }
    }
  };

  function shuffleArray(arr) {
    let newArr = arr.slice();

    for (let i = newArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }

    return newArr;
  }

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center h-[650px] bg-slate-500">
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-[800px]">
          <div>
            {questions[currentIndex] ? (
              <div>
                <p className="mb-4">
                  Q{currentIndex + 1}: {questions[currentIndex].question.text}
                </p>
                <ul ref={selectedOptionRef}>
                  {shuffleArray([
                    ...questions[currentIndex].incorrectAnswers,
                    questions[currentIndex].correctAnswer,
                  ]).map((item, index) => (
                    <li key={index} className="mt-1">
                      <input type="radio" value={item} name="choice" />
                      <label className="ml-2">{item}</label>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
          <button
            className="bg-green-700 w-1/5 text-zinc-50 p-1 rounded-3xl mt-5"
            onClick={nextQuestion}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
