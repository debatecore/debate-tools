"use client";
import { motion, motionTypeCode, motionTypesObjects } from "@/types/motion";
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
 * Polish the filter component style
 */

const MotionGenerator = () => {
  const [motion, setMotion] = useState<motion | null>(null);
  const debateContext = useContext(DebateContext);
  const router = useRouter();

  function generateMotion(): motion {
    const filteredMotions = motions.filter((motion) => {
      //TO-DO: figure out why this logic statement is always false
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

  /**
   * TO-DO: figure out a way to do without this function and rely on {@link motionTypesArray} instead
   * @returns A writeable copy of {@link motionTypesArray}
   */
  const getMotionTypesStrings: () => motionTypeCode[] = () => {
    return motionTypesObjects.map((motionType) => {
      return motionType.type;
    });
  };

  const [filtersVisibility, setFiltersVisibility] = useState(false);
  const [typeFiltersActive, setTypeFiltersActive] = useState(false);
  const [langFiltersActive, setLangFiltersActive] = useState(false);
  const [enabledMotionTypes, setEnabledMotionTypes] = useState<motionTypeCode[]>(
    getMotionTypesStrings()
  );

  const handleFiltersChange = (newState: motionTypeCode) => {
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
          highlightIcon={langFiltersActive || typeFiltersActive}
        />
      </section>
      <MotionsFilter hidden={filtersVisibility} onFiltersChange={handleFiltersChange} />
      <MotionDisplay motion={motion} />
    </div>
  );
};

export { MotionGenerator };
