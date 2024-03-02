"use client";
import { ReactTyped } from "react-typed";
import React, { useEffect } from "react";
import { useState } from "react";

export default function Suggestions({ questions }) {
  const [suggesstions, setSuggestions] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerBox, setAnswerBox] = useState(false);
  const [suggestionLinks, setSuggestionLinks] = useState(true);
  const questionsToAsk = [];
  questions.forEach((element) => {
    questionsToAsk.push(element.question);
  });
  console.log(questionsToAsk);

  function filterSuggestions(input, allQuestions) {
    if (!allQuestions) {
      return [];
    }
    const regex = new RegExp(input);
    return allQuestions.filter((question) => regex.test(question));
  }

  useEffect(() => {
    const filtered = filterSuggestions(userInput, questionsToAsk);

    setSuggestions(filtered);
  }, [userInput]);
  console.log(suggesstions);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!userInput){
      return;
    }

    const questionAnswer = questions.find(
      (question) => question.question === userInput
    );
    setAnswer(questionAnswer.answer);
    setAnswerBox(true);
  };
  const hanleCloseClick = () => {
    setAnswerBox(false);
    setUserInput("");
    setSuggestionLinks(true);
  };
  return (
    <div className="w-3/5  h-4/5 py-8 flex items-center  justify-start flex-col ">
      <form
        className="w-full flex justify-center gap-4"
        onSubmit={handleSubmit}
      >
        <input
        
          value={userInput}
          onChange={(e) =>  setUserInput(e.target.value)}
          placeholder="Type your question"
          className="p-4 rounded-xl w-3/5"
        />
        <button
          className="bg-black rounded-xl text-white font-bold text-lg px-4 py-2"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="w-[70%] ">
        {" "}
        {userInput && (
          <ul className={`${suggestionLinks ? "block w-3/5  " : "hidden"}`}>
            {suggesstions.length > 0 ? (
              suggesstions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => {
                    setUserInput(suggestion);
                    setSuggestionLinks(false);
                  }}
                  className="shadow-lg w-full cursor-pointer  py-1 px-3 mb-1  "
                >
                  {suggestion}
                </li>
                // <li
                //   className="block border-2 border-red-500 py-1 px-3 mb-1 whitespace-pre-wrap "
                //   key={suggestion}
                //   onClick={() =>{
                //      setUserInput(suggestion)

                //     }}
                // >
                //   {suggesstions.map((item)=><p key={item} className="block">{item}</p>)}
                // </li>
              ))
            ) : (
              <li>No Matching Suggestions</li>
            )}
          </ul>
        )}
      </div>

      <div
        className={`answer w-4/5 rounded-lg relative bg-gray-200 p-8 mt-16 ${
          answerBox ? "block" : "hidden"
        }`}
      >
        <span
          className=" h-4 flex items-center justify-center w-4 absolute  text-blacl font-bold  right-1 top-1     rounded-lg cursor-pointer "
          onClick={hanleCloseClick}
        >
          x
        </span>
        <ReactTyped strings={[answer]} typeSpeed={40} />
      </div>
    </div>
  );
}
