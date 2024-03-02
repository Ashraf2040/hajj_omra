import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div
      className="
      w-full bg-[#F6E8DD]   flex items-center justify-between  px-12 h-16  "
    >
      <p className=" ">A.I Assistant for the Guests of Allah</p>
    <Image src="/logo.png" alt="diaf" width={180} height={180}  className="h-10 w-10"/>
    </div>
  );
}
