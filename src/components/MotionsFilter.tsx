"use client";
import { getSpecificLangString, useLang } from "@/lib/useLang";
import { langsArray, langsPublicBlacklist, language } from "@/types/language";
import { motionTypesObjects, motionTypeCode, motionTypesArray } from "@/types/motion";
import { Checkbox } from "./Checkbox";
import { useEffect, useState } from "react";
import motions from "@/data/motion.json";

type MotionsFilterProps = {
  onFiltersChange: (newState: motionTypeCode[]) => void;
};

/**
 * Current state of things:
 * - when motionTypes are unchecked by applying language filters,
 *   enabledMotionTypes must be changed accordingly, which, as of now, they don't do
 */

const MotionsFilter = (props: MotionsFilterProps) => {
  const applyMotionTypeFilter = (event: any) => {
    const checkedMotionType = event.target.value;
    if (event.target.checked) {
      if (enabledMotionTypes.length == motionTypesObjects.length) {
        setEnabledMotionTypes([checkedMotionType]);
      } else {
        setEnabledMotionTypes([...enabledMotionTypes, checkedMotionType]);
      }
      setCheckedMotionTypes(
        checkedMotionTypes.map((motionType) => {
          if (motionType.type == checkedMotionType) {
            return {
              ...motionType,
              checked: true,
            };
          } else return { ...motionType };
        })
      );
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
      setCheckedMotionTypes(
        checkedMotionTypes.map((motionType) => {
          if (motionType.type == checkedMotionType) {
            return {
              ...motionType,
              checked: false,
            };
          } else return { ...motionType };
        })
      );
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
      console.log(enabledMotionTypes);
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
    setCheckedMotionTypes(
      checkedMotionTypes.map((motionType) => {
        if (motionType.checked && motionType.lang == checkedLanguage)
          return {
            ...motionType,
            checked: true,
          };
        else
          return {
            ...motionType,
            checked: false,
          };
      })
    );
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
    console.log(checkedMotionTypes);
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

  /**
   * A list of currently checked motion type checkboxes
   * checked != enabled
   */
  const [checkedMotionTypes, setCheckedMotionTypes] = useState(
    motionTypesObjects.map((motionType) => {
      return {
        ...motionType,
        checked: false,
      };
    })
  );

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
        "grow-0 xl:self-start bg-neutral-900 border-2 border-neutral-800 p-3 rounded-lg"
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
              checkboxKey={langCode}
              name="language"
              value={langCode}
              labelText={getSpecificLangString("selfLanguageString", langCode)}
              onChange={applyLanguageFilter}
            />
            {motionTypesObjects
              .filter((motionType) => motionType.lang === langCode)
              .map((motionType: { lang: language; type: motionTypeCode }) => (
                <Checkbox
                  checkboxKey={motionType.type}
                  name="motionType"
                  value={motionType.type}
                  labelText={motionType.type}
                  disabled={!enabledLanguages.includes(motionType.lang)}
                  onChange={applyMotionTypeFilter}
                  checked={
                    checkedMotionTypes.find((motionTypeState) => {
                      return motionTypeState.type == motionType.type;
                    })?.checked
                  }
                />
              ))}
          </section>
        ))}
      </section>
    </div>
  );
};
export { MotionsFilter };
