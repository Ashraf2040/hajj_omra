import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className=" shadow-lg flex relative flex-col  pb-8  items-center bg-gray-100">
      <div className="flex items-center justify-center   ">
       <Link href="/"> <Image
          src="/logo.png"
          height={300}
          width={300}
          alt="logo"
          className="max-h-28 max-w-28"
        /></Link>
        <Image src="/diaf.png" alt="diaf" width={180} height={180} />
      </div>
      <h1 className=" leading-5 text-xl  font-semibold">
        A.I Assistant for the Guests of Allah{" "}
      </h1>
      {/* <div className=" flex absolute left-8 items-center gap-2 mt-3 ">
        <button className="bg-[#E6EFEA] rounded-lg py-2  px-3 text-green-800 font-semibold">
          En
        </button>
        <button className="bg-[#E6EFEA] rounded-lg py-2 px-3 text-green-800 font-semibold">
          Ar
        </button>
      </div> */}
    </div>
  );
}
