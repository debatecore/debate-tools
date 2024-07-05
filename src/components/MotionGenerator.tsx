"use client";
import { motion, motionTypeCode, motionTypesArray } from "@/types/motion";
import motions from "@/data/motion.json";
import { useContext, useEffect, useState } from "react";
import { GenericButton } from "./GenericButton";
import { DebateContext } from "@/contexts/DebateContext";
import { IconDice } from "./icons/Dice";
import { IconClock } from "./icons/Clock";
import { useRouter } from "next/navigation";
import { MotionDisplay } from "./MotionDisplay";
import { MotionsFilter } from "./MotionsFilter";
import { useLang } from "@/lib/useLang";

const MotionGenerator = () => {
  const [motion, setMotion] = useState<motion | null>(null);
  const debateContext = useContext(DebateContext);
  const router = useRouter();

  function generateMotion(): motion {
    const filteredMotions = motions.filter((motion) => {
      return motion.type && enabledMotionTypes.includes(motion.type as motionTypeCode);
    });
    return filteredMotions[Math.floor(Math.random() * filteredMotions.length)];
  }

  function saveMotionToContext(): void {
    debateContext.setConf({
      ...debateContext.conf,
      motion: motion?.motion || "",
    });
  }

  const [enabledMotionTypes, setEnabledMotionTypes] = useState<motionTypeCode[]>([
    ...motionTypesArray,
  ]);

  /** Calls {@link generateMotion()} on page load. */
  useEffect(() => {
    if (!enabledMotionTypes.includes(motion?.type as motionTypeCode)) {
      setMotion(generateMotion());
    }
  }, [enabledMotionTypes]);

  const handleFiltersChange = (newState: motionTypeCode[]) => {
    setEnabledMotionTypes(newState as any);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <section className="hidden xl:flex flex-col space-y-2 max-w-[400px]">
        <GenericButton
          text={useLang("debateMotionGeneratorRegenerate")}
          icon={IconDice}
          onClick={() => setMotion(generateMotion())}
        />
        <GenericButton
          text={useLang("debateOverThisMotion")}
          icon={IconClock}
          onClick={() => {
            saveMotionToContext();
            router.push("/oxford-debate/setup");
          }}
        />
      </section>
      <hr className="border-b-2 mt-8 mb-8 rounded border-neutral-800 my-2 w-full" />
      <section className="flex flex-col xl:flex-row items-center">
        <MotionsFilter onFiltersChange={handleFiltersChange} />
        <section className="flex xl:hidden flex-col mt-5 space-y-2 max-w-[400px]">
          <GenericButton
            text={useLang("debateMotionGeneratorRegenerate")}
            icon={IconDice}
            onClick={() => setMotion(generateMotion())}
          />
          <GenericButton
            text={useLang("debateOverThisMotion")}
            icon={IconClock}
            onClick={() => {
              saveMotionToContext();
              router.push("/oxford-debate/setup");
            }}
          />
        </section>
        <MotionDisplay motion={motion} />
      </section>
    </div>
  );
};

export { MotionGenerator };
