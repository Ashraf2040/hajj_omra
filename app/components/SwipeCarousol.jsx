"use client";
import React, { useState } from "react";

import { motion, useMotionValue } from "framer-motion";
import Link from "next/link";
const imgs = [
  {
    title: "Mecca",
    src: "/1.png",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa assumenda ut error inventore aperiam. Cumque vitae laudantium architecto, voluptatem nobis vero expedita eos nesciunt doloremque odio est perferendis minima quo adipisci suscipit modi harum nam quaerat velit. Exercitationem reiciendis eligendi ea praesentium distinctio! Quisquam iusto quis vitae fugit sequi magni!",
  },
  {
    title: "Mecca",
    src: "/2.png",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa assumenda ut error inventore aperiam. Cumque vitae laudantium architecto, voluptatem nobis vero expedita eos nesciunt doloremque odio est perferendis minima quo adipisci suscipit modi harum nam quaerat velit. Exercitationem reiciendis eligendi ea praesentium distinctio! Quisquam iusto quis vitae fugit sequi magni!",
  },
  {
    title: "Mecca",
    src: "/3.png",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa assumenda ut error inventore aperiam. Cumque vitae laudantium architecto, voluptatem nobis vero expedita eos nesciunt doloremque odio est perferendis minima quo adipisci suscipit modi harum nam quaerat velit. Exercitationem reiciendis eligendi ea praesentium distinctio! Quisquam iusto quis vitae fugit sequi magni!",
  },
  {
    title: "Mecca",
    src: "/4.png",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa assumenda ut error inventore aperiam. Cumque vitae laudantium architecto, voluptatem nobis vero expedita eos nesciunt doloremque odio est perferendis minima quo adipisci suscipit modi harum nam quaerat velit. Exercitationem reiciendis eligendi ea praesentium distinctio! Quisquam iusto quis vitae fugit sequi magni!",
  },
  {
    title: "Mecca",
    src: "/5.png",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa assumenda ut error inventore aperiam. Cumque vitae laudantium architecto, voluptatem nobis vero expedita eos nesciunt doloremque odio est perferendis minima quo adipisci suscipit modi harum nam quaerat velit. Exercitationem reiciendis eligendi ea praesentium distinctio! Quisquam iusto quis vitae fugit sequi magni!",
  },
  {
    title: "Mecca",
    src: "/6.png",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa assumenda ut error inventore aperiam. Cumque vitae laudantium architecto, voluptatem nobis vero expedita eos nesciunt doloremque odio est perferendis minima quo adipisci suscipit modi harum nam quaerat velit. Exercitationem reiciendis eligendi ea praesentium distinctio! Quisquam iusto quis vitae fugit sequi magni!",
  },
];

const DRAG_Buffer = 50;
export default function SwipeCarousol() {
  const [imgIndex, setImgIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  const dragX = useMotionValue(0);
  const onDragStart = () => {
    setDragging(true);
  };
  const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
  };

  const onDragEnd = () => {
    setDragging(false);
    const x = dragX.get();
    if (x <= -DRAG_Buffer && imgIndex < imgs.length - 1) {
      setImgIndex((prev) => prev + 1);
    } else if (x >= DRAG_Buffer && imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };
  console.log(imgIndex);
  return (
    <div className="relative flex flex-col  overflow-hidden py-8  ">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className="flex items-center w-full cursor-grab active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} SPRING_OPTIONS={SPRING_OPTIONS} />
      </motion.div>
      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
      <div className="w-4/5 self-center my-8">
        <p className="font-semibold whitespace-pre-wrap   text-teal-800">
          {imgs.map((img, idx) => (idx === imgIndex ? img.desc : null))}
        </p>
      </div>
    </div>
  );
}

const Images = ({ imgIndex, SPRING_OPTIONS }) => {
  return (
    <>
      {imgs.map((img, idx) => {
        return (
          <div
            key={idx}
            className="flex relativ flex-col text-xl font-semibold text-green-600 items-center  "
          >
            <span className="absolute left-4 md: text-3xl font-bold"><Link href="/" className="text-[#B8900E]">←</Link></span>
            <h1>{img.title}</h1>
            <motion.div
              key={idx}
              style={{
                backgroundImage: `url(${img.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              animate={{
                scale: imgIndex === idx ? 0.75 : 0.55,
              }}
              transition={SPRING_OPTIONS}
              className="  aspect-video w-screen  shrink-0   rounded-xl  object-cover"
            ></motion.div>
          </div>
        );
      })}
    </>
  );
};

const Dots = ({ imgIndex, setImgIndex }) => {
  return (
    <div
      className="
flex mt-4 w-full justify-center gap-2
"
    >
      {imgs.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setImgIndex(idx)}
          className={`h-3 w-3 rounded-full ${
            idx === imgIndex ? "bg-neutral-50" : "bg-neutral-600"
          } transition-colors`}
        />
      ))}
    </div>
  );
};
// const GradientEdges = () => {
//   return (
//     <>
//       <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
//       <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
//     </>
//   );
// };
