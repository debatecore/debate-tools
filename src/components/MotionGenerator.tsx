"use client";
import { motion, motionTypes } from "@/types/motion";
import motions from "@/data/motion.json";
import { useContext, useEffect, useState } from "react";
import { IconInfo } from "@/components/icons/info";
import { getSpecificLangString, useLang } from "@/lib/useLang";
import { GenericButton } from "./GenericButton";
import { DebateContext } from "@/contexts/DebateContext";
import { IconDice } from "./icons/Dice";
import { IconClock } from "./icons/Clock";
import { useRouter } from "next/navigation";
import { langsArray, langsPublicBlacklist, language } from "@/types/language";
import { Checkbox } from "./Checkbox";
import { IconFilter } from "./icons/Filter";

/**
 * TO-DO:
 * Fix errors
 * Componentize as much as possible
 * Polish the filter component style
 */

const MotionGenerator = () => {
  const [motion, setMotion] = useState<motion | null>(null);
  const infoslideString = useLang("infoslide");
  const debateContext = useContext(DebateContext);
  const router = useRouter();

  function generateMotion(): motion {
    const filteredMotions = motions.filter((motion) => {
      return (
        motion.type &&
        enabledLanguages.includes(motion.lang) &&
        enabledMotions.includes(motion.type as any)
      );
    });
    return filteredMotions[Math.floor(Math.random() * filteredMotions.length)];
  }

  function saveMotionToContext(): void {
    debateContext.setConf({
      ...debateContext.conf,
      motion: motion?.motion || "",
    });
  }

  /** Calls the {@link generateMotion()} on page load. */
  useEffect(() => {
    setMotion(generateMotion());
  }, []);

  const allowedMotionLanguages = [
    ...langsArray
      .filter((lang) => !langsPublicBlacklist.includes(lang))
      .map((lang) => {
        return lang;
      }),
  ];

  const [enabledLanguages, setEnabledLanguages] = useState(
    allowedMotionLanguages.map((lang) => {
      return lang.toString();
    })
  );

  const getMotionTypesStrings = () => {
    return motionTypes.map((motionType) => {
      return motionType.type;
    });
  };

  const [enabledMotions, setEnabledMotions] = useState(getMotionTypesStrings());

  function languageHasMotions(lang: language) {
    const motionsInLanguage = motions.filter((motion) => {
      return motion.lang == lang;
    });
    return motionsInLanguage.length > 0;
  }

  const languagesWithMotions = () => {
    return allowedMotionLanguages.filter((lang) => {
      return languageHasMotions(lang);
    });
  };

  const [filtersVisibility, setFiltersVisibility] = useState(false);

  const applyLanguageFilter = (event: any) => {
    const checkedLanguage: string = event.target.value;
    if (event.target.checked) {
      if (enabledLanguages.length == allowedMotionLanguages.length) {
        setEnabledLanguages([checkedLanguage]);
      } else {
        setEnabledLanguages([...enabledLanguages, checkedLanguage]);
      }
    } else {
      if (enabledLanguages.length == 1) {
        setEnabledLanguages(allowedMotionLanguages);
      } else {
        setEnabledLanguages(
          enabledLanguages.filter((entry) => {
            return entry != checkedLanguage;
          })
        );
      }
    }
  };

  const applyMotionTypeFilter = (event: any) => {
    const checkedMotionType = event.target.value;
    if (event.target.checked) {
      if (enabledMotions.length == motionTypes.length) {
        setEnabledMotions([checkedMotionType]);
      } else {
        setEnabledMotions([...enabledMotions, checkedMotionType]);
      }
    } else {
      if (enabledMotions.length == 1) {
        setEnabledMotions(getMotionTypesStrings());
      } else {
        setEnabledMotions(
          enabledMotions.filter((entry) => {
            return entry != checkedMotionType;
          })
        );
      }
    }
  };

  function isLanguageDisabled(motionLanguage: language): boolean {
    if (enabledLanguages.includes(motionLanguage)) {
      return false;
    }
    return true;
  }

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
      </section>{" "}
      <div
        className={
          filtersVisibility
            ? "bg-transparent border-2 border-neutral-800 p-3 rounded-lg m-4"
            : "bg-transparent border-2 border-neutral-800 p-3 rounded-lg m-4 hidden"
        }
      >
        <h5 className="text-center font-bold m-2">{useLang("motionFilterTitle")}</h5>
        <GenericButton
          text={useLang("applyFilterButtonText")}
          icon={IconFilter}
          onClick={() => {
            if (
              motion?.type &&
              motion?.lang &&
              !(
                enabledMotions.includes(motion?.type as any) &&
                enabledLanguages.includes(motion?.lang)
              )
            )
              setMotion(generateMotion());
          }}
        />
        <section className="flex flex-col m-2">
          <h6 className="text-center">{useLang("language")}</h6>
          {languagesWithMotions().map((langCode: language) => (
            <Checkbox
              key={langCode}
              name="language"
              value={langCode}
              labelText={getSpecificLangString("selfLanguageString", langCode)}
              onChange={applyLanguageFilter}
            />
          ))}
        </section>
        <section>
          <h6 className="text-center">{useLang("motionType")}</h6>
          {motionTypes.map((motionType) => (
            <Checkbox
              key={motionType.type}
              name="motionType"
              value={motionType.type}
              // TO-DO: Don't use the useLang hook in a callback
              labelText={useLang(motionType.type)}
              disabled={isLanguageDisabled(motionType.lang)}
              onChange={applyMotionTypeFilter}
            />
          ))}
        </section>
      </div>
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
        <p className="text-neutral-500 flex flex-col">
          {"[Insert motion type here]"}
          <br />
          {motion?.source || ""}
        </p>
      </section>
    </div>
  );
};

export { MotionGenerator };
