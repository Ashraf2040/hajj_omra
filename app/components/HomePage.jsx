"use client";
import { ReactTyped } from "react-typed";


import debounce from "debounce";
import { Message, experimental_useAssistant as useAssistant } from "ai/react";
import { useEffect, useRef, useState } from "react";
import styles from "./loader.module.css";

import Link from "next/link";
import QuestionCard from "./QuestionCard";
import Image from "next/image";

const  Home = ()=> {

  const { status, messages, submitMessage, input, handleInputChange, error } =
    useAssistant({
      api: "/api/assistant",
    });

  const askedQuestions1 = [
    "ماهي مناسك الحج؟",
    "ماهي مناسك العمرة؟",
    "ماهو ميقات اهل المدينة؟",
    "ماهي شروط حج التمتع ؟",
    "كيفية لبس الاحرام ؟",
    "مالفرق بين التحلل الاكبر والاصغر؟",
  ];
  const askedQuestions2 = [
    "ماهي مناسك الحج1؟",
    "ماهي مناسك العمرة1؟",
    "ماهو ميقات اهل المدينة1؟",
    "ماهي شروط حج التمتع1 ؟",
    "كيفية لبس الاحرام1 ؟",
    "مالفرق بين التحلل الاكبر والاصغر1؟",
  ];
  const newArray = askedQuestions1.concat(askedQuestions2);

  const [merged, setMerged] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [suggesstions, setSuggestions] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [suggestionLinks, setSuggestionLinks] = useState(true);
  const [answer, setAnswer] = useState("");
  const [answerBox, setAnswerBox] = useState(false);
  const predefinedQuestions = [
    {
      question: "What is the difference between Hajj and Umrah?",
      answer:
        "Hajj is a mandatory pilgrimage for Muslims who are able-bodied and financially able, performed once in a lifetime. It involves a set of rituals performed at specific times and locations in Mecca and its surroundings. Umrah, on the other hand, is a non-obligatory pilgrimage that can be performed anytime throughout the year. While similar in some rituals, it is shorter and less extensive than Hajj.",
    },
    {
      question: "What are the pillars of Hajj?",
      answer:
        "The five pillars of Hajj are: 1. Ihram (entering the state of consecration), 2. Tawaf (circumambulation of the Kaaba), 3. Sa'i (walking seven times between the hills of Safa and Marwa), 4. Wuquf (standing in prayer at Arafat), and 5. Throwing stones at the Jamarat.",
    },
    {
      question: "What are the requirements for performing Hajj?",
      answer:
        "The requirements for performing Hajj include being a Muslim, reaching the age of puberty, being in good physical and financial health, and having the ability to travel safely to Mecca.",
    },
    {
      question: "What are the benefits of performing Hajj?",
      answer:
        "Hajj is believed to be a way to cleanse oneself of sins, strengthen faith, and promote unity among Muslims. It is also seen as an opportunity to connect with the history and tradition of Islam.",
    },
    {
      question: "What are the rituals of Umrah?",
      answer:
        "Umrah involves similar rituals to Hajj, including Ihram, Tawaf, Sa'i, and shaving or trimming one's hair. However, it does not include the standing in Arafat or throwing stones at the Jamarat.",
    },
    {
      question: "What are the benefits of performing Umrah?",
      answer:
        "Performing Umrah is believed to bring spiritual rewards and forgiveness of sins. It also allows Muslims to experience the sacred city of Mecca and its significance in Islam.",
    },
    // Additional questions
    {
      question: "What is the significance of the Kaaba in Hajj and Umrah?",
      answer:
        "The Kaaba is considered the holiest site in Islam and is believed to have been built by Abraham and his son Ishmael. Circumambulating the Kaaba (Tawaf) is a central ritual in both Hajj and Umrah.",
    },
    {
      question: "What is the purpose of wearing Ihram during Hajj and Umrah?",
      answer:
        "Ihram is a state of consecration that signifies devotion to Allah and detachment from worldly matters. It requires wearing simple white garments and abstaining from certain activities like sexual intimacy, hunting, and using perfumes.",
    },
    {
      question:
        "What is the significance of Sa'i between Safa and Marwa hills?",
      answer:
        "Sa'i commemorates the efforts of Hagar, wife of Abraham, searching for water for her son Ishmael. It signifies perseverance, trust in Allah, and seeking His mercy.",
    },
    {
      question:
        "ماهي مناسك الحج?",
      answer:
        "هناك العديد من المناسك",
    },
    {
      question: "What is the meaning of standing in Arafat during Hajj?",
      answer:
        "Standing in Arafat is a central pillar of Hajj and a time for deep reflection, repentance, and supplication. It is considered a peak experience in Hajj, where Muslims seek forgiveness and draw closer to Allah.",
    },
    {
      question:
        "What is the symbolic meaning of throwing stones at the Jamarat during Hajj?",
      answer:
        "Throwing stones at the Jamarat represents the rejection of temptation and evil, symbolized by the story of Abraham rejecting the devil's attempts to dissuade him from sacrificing his son Ishmael.",
    },
    {
      question:
        "Who is responsible for making arrangements for Hajj and Umrah?",
      answer:
        "Individuals are ultimately responsible for making their own arrangements for Hajj and Umrah. However, there are travel agencies and organizations that specialize in assisting pilgrims with logistics, accommodations, and guidance.",
    },
    {
      question:
        "What are some of the challenges faced by pilgrims during Hajj and Umrah?",
      answer:
        "Challenges faced by pilgrims can include large crowds, hot weather, physical exertion, and ensuring proper planning and preparation. However, the spiritual significance and sense of community often outweigh these challenges.",
    },
    {
      question: "What is the difference between Hajj and Umrah attire?",
      answer:
        "While both Hajj and Umrah require wearing Ihram, there are slight differences for men. Men wear two unstit",
    },
  ];

  const questionsToAsk = [];
  predefinedQuestions.forEach((element) => {
    questionsToAsk.push(element.question);
  });
 
  function filterSuggestions(input, allQuestions) {
    if (!allQuestions) {
      return [];
    }
    const regex = new RegExp(input, "gi");
    return allQuestions.filter((question) => regex.test(question));
  }

  useEffect(() => {
    const filtered = filterSuggestions(userInput, questionsToAsk);

    setSuggestions(filtered);
  }, [userInput]);
 

  const [questionArray, setQuestionArray] = useState(askedQuestions1);

  // When status changes to accepting messages, focus the input:
  const inputRef = useRef(null);
  useEffect(() => {
    if (status === "awaiting_message") {
      inputRef.current?.focus();
    }
  
  }, [status]);

  const handleSerchClick = () => {
    setEnabled(!enabled);
  };
  const handleClick = () => {
    if (merged) {
      setQuestionArray(newArray);
    } else {
      setQuestionArray(askedQuestions1);
    }
    setMerged(!merged);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const questionAnswer = predefinedQuestions.find(
      (question) => question.question === userInput
    );
    setAnswer(questionAnswer.answer);
    setAnswerBox(true);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 8) {
      const newInput = userInput.slice(0, -1);
      setUserInput(newInput);
      filterSuggestions(newInput);
    }
  };
 
  const hanleCloseClick = () => {
    setAnswerBox(false);
    setUserInput("");
    setSuggestionLinks(true);
    
  };

  const handleUserInputChange = (e) => {
    
    setUserInput(e.target.value);
   
  };
  

  return (
    <div className=" flex flex-col w-full  items-center  py-4   ">
      <div className="navigate flex items-center gap-2 my-2">
        <button
          className="bg-gradient-to-br px-4 rounded-lg font-semibold text-white py-2 from-[#366a3d] to-green-400"
          onClick={handleSerchClick}
        >
          Ask Ai
        </button>
        <Link href="/tour">
          <button className="bg-gradient-to-br px-2 rounded-lg font-semibold text-white py-2 from-[#54A15E] to-green-400">
            Tak a Tour
          </button>
        </Link>
      </div>

      <div className="  w-[90%]  my-4 flex flex-col  ">
        <div>
          {messages.map((m) => (
            <div key={m.id} className=" py-8 bg-gray-100 rounded-lg  relative ">
              <>
                <div className="flex gap-2 items-center  mb-10      ">
                  <span className="text-3xl flex ">
                    {m.role === "user" && (
                      <div className="absolute right-10  sm:right-0 flex items-center h-fit mb-4 ">
                        <span
                          className="bg-[#CDE4D6]  rounded-l-lg rounded-tr-xl
                         text-[18px] font-semibold px-8 py-0.5"
                        >
                          {m.content}
                        </span>
                        🤵
                      </div>
                    )}
                  </span>
                </div>
                <div>
                  <div className="flex items-center  justify-start mt-16   w-fit sm:mt-8  pl-4 ">
                    <div className="flex items-center w-fit relative ">
                      {status === "in_progress" ? (
                        <Image
                          src="/Ai.png"
                          alt=""
                          width={40}
                          height={40}
                          className="h-10 w-10"
                        />
                      ) : (
                        ""
                      )}
                      {status === "in_progress" ? (
                        <span
                          className={`${styles.loader} absolute left-3 bottom-0`}
                        ></span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {m.role === "assistant" && (
                    <p
                      style={{ direction: "rtl" }}
                      className="whitespace-pre-wrap ml-8 w-4/5 bg-white self-center  p-10"
                    >
                      {m.content}
                    </p>
                  )}
                </div>
              </>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={suggesstions.length > 0 ? handleSubmit : submitMessage}
        className={` items-center justify-center  w-full lg:w-2/5 ${
          !enabled ? "hidden" : "flex"
        } `}
      >
        <input
          ref={inputRef}
          disabled={status !== "awaiting_message"}
          className="  p-4  border border-gray-300 bg-white  rounded shadow-xl w-4/5"
          value={suggesstions.length > 0 ? userInput : input}
          placeholder="Type your question..."
          type="text"
          onChange={suggesstions.length > 0 ?handleUserInputChange
           :handleInputChange
          }
          onKeyDown={handleKeyDown}
       
          // onKeyDown={handleKeyDown}
        />
        <button className="p-4 bg-black rounded-r-lg -ml-2 font-bold text-white px-4 ">
          Ask
        </button>
      </form>
      <div className="w-full  my-4 flex items-center justify-center  ">
        {" "}
        {userInput && (
          <ul
            className={`${
              suggestionLinks ? " mx-4   grid grid-cols-3  gap-4   " : "hidden"
            }`}
          >
            {suggesstions.length > 0 &&
              suggesstions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => {
                    setUserInput(suggestion);
                    setSuggestionLinks(false);
                  }}
                  className="border-2 text-center rounded-lg py-2 sm:text-sm leading-6 font-semibold text-md cursor-pointer "
                >
                  {suggestion}
                </li>
              ))}
          </ul>
        )}
      </div>
      <div
        className={`answer w-4/5 rounded-lg relative bg-[#F0F4F9] p-8 mt-16 ${
          answerBox ? "block" : "hidden"
        }`}
      >
        <span
          className=" h-4 flex items-center justify-center w-4 absolute  text-blacl font-bold  right-1 top-1     rounded-lg cursor-pointer "
          onClick={hanleCloseClick}
        >
          x
        </span>
        <p className="bg-[#CDE4D6] w-fit  px-4 py-3 font-semibold right-2  mb-8 rounded-lg">
          <span className="md:text-2xl">🤵</span> {userInput}
        </p>
        <div className="bg-white rounded-lg p-8 flex items-center gap-6">
         <Link href="/">
         <Image
            src="/Ai.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10"
          />{" "}
         </Link>
         
          <ReactTyped strings={[answer]} typeSpeed={40} />
        </div>
      </div>

      <h2
        className={`text-md font-semibold ${
          userInput ? "hidden" : "block"
        } my-4`}
      >
        Few examples to ask
      </h2>
      <div
        className={`FAQ w-4/5 ${
          userInput ? "hidden" : "block"
        }  grid md:grid-cols-2  lg:grid-cols-3 gap-5`}
      >
        {questionArray.map((question) => (
          <QuestionCard
            key={question}
            submitMessage={submitMessage}
            question={question}
            ref={inputRef}
          />
        ))}
      </div>
      <div
        className={` w-4/5 flex justify-center ${
          userInput ? "hidden" : "block"
        } items-center py-4 `}
      >
        <li
          className="flex  gap-1 w-fit cursor-pointer  font-semibold  text-green-900"
          onClick={handleClick}
        >
          {!merged ? "Less examples" : "More examples"}
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6  h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </li>
      </div>
    </div>
  );
}


export default Home