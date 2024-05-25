"use client";
import { getSpecificLangString, useLang } from "@/lib/useLang";
import { langsArray, langsPublicBlacklist, language } from "@/types/language";
import { motionTypesObjects, motionTypeCode, motionTypesArray } from "@/types/motion";
import { Checkbox } from "./Checkbox";
import { ChangeEvent, useEffect, useState } from "react";
import motions from "@/data/motion.json";

type MotionsFilterProps = {
  onFiltersChange: (newState: motionTypeCode[]) => void;
};

const MotionsFilter = (props: MotionsFilterProps) => {
  /**
   * @description Changes the contents of {@link enabledMotionTypes } and {@link checkedMotionTypes}
   * according to the state of motion type checkboxes. If none are checked,
   * all motion types are enabled. If one or more are checked,
   * only the checked motion types are enabled.
   * @param event An event raised when a motion type checkbox is checked or unchecked
   */
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
   * @description Changes the contents of {@link enabledLanguages }
   * according to language checkboxes. If none are checked,
   * all languages are enabled. If one or more are checked,
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
    setEnabledMotionTypes(
      enabledMotionTypes.filter((motionType) => isMotionTypeInEnabledLanguage(motionType))
    );
  };

  function isMotionTypeInEnabledLanguage(motionType: motionTypeCode): boolean {
    const motionTypeObject = motionTypesObjects.find((motionTypeObject) => {
      return motionTypeObject.type == motionType;
    });
    if (motionTypeObject && motionTypeObject?.lang in allowedMotionLanguages) {
      return true;
    } else {
      return false;
    }
  }

  /**
   *
   * @returns Motion types with both language and type filters applied
   */
  function combineFilters(): motionTypeCode[] {
    if (enabledMotionTypes.length == 0) {
      setEnabledMotionTypes([...motionTypesArray]);
    }
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

  /**
   * A list of non-blacklisted languages
   */
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
   * A list of motion types that is being passed to a parent component
   */
  const [filteredMotionTypes, setFilteredMotionTypes] = useState<motionTypeCode[]>([
    ...motionTypesArray,
  ]);

  /**
   * A list of currently checked motion type checkboxes.
   * The checkboxes' state is tracked separately, as the checkbox being checked
   * does not always correspond with the motion type being enabled
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

  /**
   * Passes the filtered motion types to a parent component
   */
  const updateFilteredMotions = (newState: motionTypeCode[]) => {
    setFilteredMotionTypes(newState);
    props.onFiltersChange(newState);
  };

  /**
   *
   * @returns Number of currently enabled motions
   */
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
