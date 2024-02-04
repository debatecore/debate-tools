"use client";

import { iconprops } from "@/types/iconprops";
import { motion } from "@/types/motion";
import motions from "@/data/motion.json";
import { useEffect, useState } from "react";
import { IconInfo } from "@/components/icons/info";

type debateMotionGeneratorButtonType = {
  text: string;
  icon?: (props: iconprops) => JSX.Element;
};
export type { debateMotionGeneratorButtonType };

const MotionGenerator = (props: debateMotionGeneratorButtonType) => {
  const [motion, setMotion] = useState<motion | null>(null);

  function generateMotion(): motion {
    const motionsCount = motions.length;
    //TO-DO: add option to generate only motions in a chosen language
    const randomMotion: motion = motions[Math.floor(Math.random() * motionsCount)];
    return randomMotion;
  }

  useEffect(() => {
    setMotion(() => generateMotion());
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center">
      <button
        onClick={() => setMotion(() => generateMotion())}
        className="relative p-4 px-24 max-w-[450px] rounded border-2 border-neutral-800
        bg-neutral-800 hover:border-neutral-700 overflow-hidden active:border-neutral-500"
      >
        <span className="z-20 relative">{props.text}</span>
      </button>
      <section className="text-center p-10">
        <p className="text-2xl md:text-2xl">{motion?.motion || ""}</p>
        <section className="p-5">
          {motion && motion.adinfo ? (
            <section className="flex flex-col items-center">
              <section className="flex max-w-[300px] space-x-1 mt-15">
                <IconInfo /> <h3>Infoslide</h3>
              </section>
              {motion.adinfo}
            </section>
          ) : (
            ""
          )}
        </section>
        <p className="text-center opacity-70">{motion?.source || ""}</p>
      </section>
    </div>
  );
};

export { MotionGenerator };
