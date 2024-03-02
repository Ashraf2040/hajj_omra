"use client";

import React, { useEffect, useRef } from "react";
import { Message, experimental_useAssistant as useAssistant } from "ai/react";
import Link from "next/link";

function QuestionCard({ question }) {
  const { status, messages, submitMessage, input, handleInputChange, error } =
    useAssistant({
      api: "/api/assistant",
    });



  return (
    <div className="border-2 rounded-lg py-2  px-1 leading-6  font-semibold   cursor-pointer text-center ">
      <Link href="" onClick={() => submitMessage(question)}>{question}</Link>
    </div>
  );
}

export default QuestionCard;
