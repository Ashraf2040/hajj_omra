import React from "react";

import SwipeCarousol from "../components/SwipeCarousol";
import { AccordionDemo } from "../components/AccordionDemo";

export default function page() {
  return (
    <div className=" flex  min-h-screen flex-col items-center   justify-center ">
      <div className="w-full"> 
        <SwipeCarousol />
      </div>
      <div className="self-center w-4/5 mb-10  lg:hidden">
        <AccordionDemo />
      </div>
    </div>
  );
}
