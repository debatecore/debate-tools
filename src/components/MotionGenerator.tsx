"use client";
import { motion } from "@/types/motion";
import motions from "@/data/motion.json";
import { useContext, useEffect, useState } from "react";
import { IconInfo } from "@/components/icons/info";
import { useLang } from "@/lib/useLang";
import { GenericButton } from "./GenericButton";
import { LinkButton } from "./LinkButton";
import { DebateContext } from "@/contexts/DebateContext";
import { IconDice } from "./icons/Dice";
import { IconClock } from "./icons/Clock";

const MotionGenerator = () => {
  const [motion, setMotion] = useState<motion | null>(null);
  const infoslideString = useLang("infoslide");
  const debateSetupPath = "/../oxford-debate/setup";
  const debateContext = useContext(DebateContext);

  function generateMotion(): motion {
    // TODO: add option to only generate motions in a chosen language
    const randomMotion = motions[Math.floor(Math.random() * motions.length)];
    debateContext.setConf({ ...debateContext.conf, motion: randomMotion.motion || "" });
    return randomMotion;
  }

  useEffect(() => {
    setMotion(generateMotion());
  }, []);

  return (
    <div className="flex flex-col items-center text-center">
      <section className="flex flex-col space-y-2 max-w-[400px]">
        <GenericButton
          text={useLang("debateMotionGeneratorRegenerate")}
          icon={IconDice}
          onClick={() => setMotion(generateMotion())}
        />
        <LinkButton
          text={useLang("debateOverThisMotion")}
          icon={IconClock}
          href={debateSetupPath}
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
