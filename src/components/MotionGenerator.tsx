"use client";
import { motion } from "@/types/motion";
import motions from "@/data/motion.json";
import { useEffect, useState } from "react";
import { IconInfo } from "@/components/icons/info";
import { useLang } from "@/lib/useLang";
import { GenericButton } from "./GenericButton";
import { IconRotateCCW } from "./icons/RotateCCW";

const MotionGenerator = () => {
  const [motion, setMotion] = useState<motion | null>(null);
  const infoslideString = useLang("infoslide");

  function generateMotion(): motion {
    // TODO: add option to only generate motions in a chosen language
    return motions[Math.floor(Math.random() * motions.length)];
  }

  useEffect(() => {
    setMotion(generateMotion());
  }, []);

  return (
    <div className="flex flex-col items-center text-center">
      <section className="max-w-[350px]">
        <GenericButton
          text={useLang("debateMotionGeneratorRegenerate")}
          icon={IconRotateCCW}
          onClick={() => setMotion(generateMotion())}
        />
      </section>
      <section className="p-5">
        {motion && motion.adinfo ? (
          <section className="flex flex-col items-center mb-5">
            <section className="flex gap-2 text-2xl items-center">
              <span className="text-neutral-500">
                <IconInfo />
              </span>
              {infoslideString}
            </section>
            <p className="text-justify max-w-[75vw]">{motion.adinfo}</p>
          </section>
        ) : (
          ""
        )}
        <p className="text-2xl md:text-2xl max-w-[85vw] mb-5">
          &quot;{motion?.motion || ""}&quot;
        </p>
        <p className="text-neutral-500">{motion?.source || ""}</p>
      </section>
    </div>
  );
};

export { MotionGenerator };
