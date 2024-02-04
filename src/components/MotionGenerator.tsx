"use client";

import { iconprops } from "@/types/iconprops";
import { motion } from "@/types/motion";
import motions from "@/data/motion.json";
import { useState } from "react";

type debateMotionGeneratorButtonType = {
  text: string;
  icon?: (props: iconprops) => JSX.Element;
}
export type { debateMotionGeneratorButtonType }

const MotionGeneratorButton = (props: debateMotionGeneratorButtonType) => {
  const [motion, setMotion] = useState(() => generateMotion());

  function generateMotion(): motion {
    const motionsCount = motions.length;
    //TO-DO: add option to generate only motions in a chosen language
    const randomMotion : motion = motions[Math.round(Math.random() * motionsCount)];
    return randomMotion;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <button
        onClick={() => setMotion(() => generateMotion())}
        className="relative p-4 px-24 min-w-[300px] rounded border-2 border-neutral-800 bg-neutral-800 hover:border-neutral-700 overflow-hidden active:border-neutral-500"
      >
        <span className="z-20 relative">{props.text}</span>
      </button>
      <section className="text-center">
        <p>{motion.motion}</p>
        <p>{motion.adinfo}</p>
        <p>{motion.source}</p>
      </section>
    </div>
  );
};

export { MotionGeneratorButton }