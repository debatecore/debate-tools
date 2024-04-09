"use client";
import { getSpecificLangString, useLang } from "@/lib/useLang";
import { langsArray, langsPublicBlacklist, language } from "@/types/language";
import { motionTypesObjects, motionTypeCode, motionTypesArray } from "@/types/motion";
import { Checkbox } from "./Checkbox";
import { GenericButton } from "./GenericButton";
import { IconFilter } from "./icons/Filter";
import { useEffect, useState } from "react";
import motions from "@/data/motion.json";

type MotionsFilterProps = {
  hidden: boolean;
  onFiltersChange: (newState: motionTypeCode[]) => void;
};

const MotionsFilter = (props: MotionsFilterProps) => {
  const applyMotionTypeFilter = (event: any) => {
    const checkedMotionType = event.target.value;
    if (event.target.checked) {
      if (enabledMotionTypes.length == motionTypesObjects.length) {
        setEnabledMotionTypes([checkedMotionType]);
      } else {
        setEnabledMotionTypes([...enabledMotionTypes, checkedMotionType]);
      }
    } else {
      if (enabledMotionTypes.length == 1) {
        setEnabledMotionTypes([...motionTypesArray]);
      } else {
        setEnabledMotionTypes(
          enabledMotionTypes.filter((entry) => {
            return entry != checkedMotionType;
          })
        );
      }
    }
  };

  /**
   * @description Changes the contents of {@link enabledMotionTypes }
   * according to motion types checkboxes. If none are checked,
   * all motion types are enabled. If one or more are checked,
   * only the checked motion types are enabled.
   * @param event An event raised when a motion type checkbox is checked or unchecked
   */
  const applyLanguageFilter = (event: any) => {
    const checkedLanguage: language = event.target.value;
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

  function combineFilters(): motionTypeCode[] {
    const filteredMotionTypes: motionTypeCode[] = [];
    motionTypesObjects.forEach((motionTypeObject) => {
      const lang = motionTypeObject.lang;
      const type = motionTypeObject.type;
      if (enabledLanguages.includes(lang) && enabledMotionTypes.includes(type)) {
        filteredMotionTypes.push(type);
      }
    });
    return filteredMotionTypes;
  }

  const allowedMotionLanguages = [
    ...langsArray
      .filter((lang) => !langsPublicBlacklist.includes(lang))
      .map((lang) => {
        return lang;
      }),
  ];
  const [enabledLanguages, setEnabledLanguages] = useState<language[]>(
    allowedMotionLanguages.map((lang) => {
      return lang;
    })
  );

  /**
   * A list of currently enabled motion types regardless of the language they're in
   */
  const [enabledMotionTypes, setEnabledMotionTypes] = useState<motionTypeCode[]>([
    ...motionTypesArray,
  ]);
  /**
   * A list of motion types enabled along with the language they're in
   */
  const [filteredMotionTypes, setFilteredMotionTypes] = useState<motionTypeCode[]>([
    ...motionTypesArray,
  ]);

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

  const updateFilteredMotions = (newState: motionTypeCode[]) => {
    setFilteredMotionTypes(newState);
    props.onFiltersChange(newState);
  };

  const enabledMotionsCount = (): number => {
    return motions.filter((motion) => {
      return filteredMotionTypes.includes(motion.type as motionTypeCode);
    }).length;
  };

  useEffect(() => {
    updateFilteredMotions(combineFilters());
  }, [enabledMotionTypes]);

  useEffect(() => {
    updateFilteredMotions(combineFilters());
  }, [enabledLanguages]);

  return (
    <div
      className={
        props.hidden
          ? "bg-transparent border-2 border-neutral-800 p-3 rounded-lg m-4 hidden"
          : "bg-neutral-900 border-2 border-neutral-800 absolute p-3 rounded-lg mt-[20vh] lg:mt-[9vh]"
      }
    >
      <h5 className="text-center font-bold m-2">{useLang("motionFilterTitle")}</h5>
      <span className="m-5">
        {useLang("availableMotionsCount") + ": " + enabledMotionsCount()}
      </span>
      <section className="flex gap-5 flex-row m-2">
        {languagesWithMotions().map((langCode: language, index: number) => (
          <section key={index}>
            <Checkbox
              key={langCode}
              name="language"
              value={langCode}
              labelText={getSpecificLangString("selfLanguageString", langCode)}
              onChange={applyLanguageFilter}
            />
            {motionTypesObjects
              .filter((motionType) => motionType.lang === langCode)
              .map((motionType: any) => (
                <Checkbox
                  key={motionType.type}
                  name="motionType"
                  value={motionType.type}
                  labelText={motionType.type}
                  disabled={!enabledLanguages.includes(motionType.lang)}
                  onChange={applyMotionTypeFilter}
                />
              ))}
          </section>
        ))}
      </section>
    </div>
  );
};
export { MotionsFilter };
