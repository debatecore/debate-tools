"use client";
import { motion, motionTypeCode, motionTypesArray } from "@/types/motion";
import motions from "@/data/motion.json";
import { useContext, useEffect, useState } from "react";
import { GenericButton } from "./GenericButton";
import { DebateContext } from "@/contexts/DebateContext";
import { IconDice } from "./icons/Dice";
import { IconClock } from "./icons/Clock";
import { useRouter } from "next/navigation";
import { IconFilter } from "./icons/Filter";
import { MotionDisplay } from "./MotionDisplay";
import { MotionsFilter } from "./MotionsFilter";
import { useLang } from "@/lib/useLang";

/**
 * TO-DO:
 * Fix errors
 * Move filters component to the side and make it always visible. Get rid of filter buttons
 * Make generation buttons static (their width subtly changes depending on the motion length)
 * Uncheck motion type checkboxes when their language is filtered out
 */

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

  /** Calls {@link generateMotion()} on page load. */
  useEffect(() => {
    setMotion(generateMotion());
  }, []);

  const [filtersVisibility, setFiltersVisibility] = useState(false);
  const [enabledMotionTypes, setEnabledMotionTypes] = useState<motionTypeCode[]>([
    ...motionTypesArray,
  ]);

  const handleFiltersChange = (newState: motionTypeCode[]) => {
    setEnabledMotionTypes(newState as any);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <section className="flex flex-col space-y-2 max-w-[400px]">
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
        <GenericButton
          text={useLang("showFiltersButtonText")}
          icon={IconFilter}
          onClick={() => setFiltersVisibility(!filtersVisibility)}
        />
      </section>
      <MotionsFilter hidden={!filtersVisibility} onFiltersChange={handleFiltersChange} />
      <MotionDisplay motion={motion} />
    </div>
  );
};

export { MotionGenerator };
