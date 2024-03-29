import { getSpecificLangString, useLang } from "@/lib/useLang";
import { langsArray, langsPublicBlacklist, language } from "@/types/language";
import { motionTypesObjects, motionTypeCode, motionTypesArray } from "@/types/motion";
import { Checkbox } from "./Checkbox";
import { GenericButton } from "./GenericButton";
import { IconFilter } from "./icons/Filter";
import { useState } from "react";
import motions from "@/data/motion.json";

type MotionsFilterProps = {
  hidden: boolean;
  onFiltersChange: (newState: motionTypeCode[]) => void;
};

const MotionsFilter = (props: MotionsFilterProps) => {
  const getMotionTypesStrings = () => {
    return motionTypesObjects.map((motionType) => {
      return motionType.type;
    });
  };

  const applyMotionTypeFilter = (event: any) => {
    const checkedMotionType = event.target.value;
    if (event.target.checked) {
      if (enabledMotionTypes.length == motionTypesObjects.length) {
        setEnabledMotionTypes([checkedMotionType]);
        setTypeFiltersActive(true);
      } else {
        setEnabledMotionTypes([...enabledMotionTypes, checkedMotionType]);
      }
    } else {
      if (enabledMotionTypes.length == 1) {
        setEnabledMotionTypes(getMotionTypesStrings());
        setTypeFiltersActive(false);
      } else {
        setEnabledMotionTypes(
          enabledMotionTypes.filter((entry) => {
            return entry != checkedMotionType;
          })
        );
      }
    }
    updateEnabledMotions(combineFilters());
  };

  const applyLanguageFilter = (event: any) => {
    const checkedLanguage: string = event.target.value;
    if (event.target.checked) {
      if (enabledLanguages.length == allowedMotionLanguages.length) {
        setEnabledLanguages([checkedLanguage]);
        setLangFiltersActive(true);
      } else {
        setEnabledLanguages([...enabledLanguages, checkedLanguage]);
      }
    } else {
      if (enabledLanguages.length == 1) {
        setEnabledLanguages(allowedMotionLanguages);
        setLangFiltersActive(false);
      } else {
        setEnabledLanguages(
          enabledLanguages.filter((entry) => {
            return entry != checkedLanguage;
          })
        );
      }
    }
    updateEnabledMotions(combineFilters());
  };

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

  /**
   * A list of currently enabled motion types regardless of the language they're in
   */
  const [enabledMotionTypes, setEnabledMotionTypes] = useState<motionTypeCode[]>(
    getMotionTypesStrings()
  );
  const [langFiltersActive, setLangFiltersActive] = useState(false);
  const [typeFiltersActive, setTypeFiltersActive] = useState(false);

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

  function isLanguageDisabled(motionLanguage: language): boolean {
    if (enabledLanguages.includes(motionLanguage)) {
      return false;
    }
    return true;
  }

  function combineFilters(): motionTypeCode[] {
    return motionTypesArray.filter((motionType: motionTypeCode) => {
      return (
        (enabledMotionTypes.includes(motionType) &&
          !enabledLanguages.includes(motionType)) ||
        (enabledMotionTypes.includes(motionType) && enabledLanguages.includes(motionType))
      );
    });
  }

  const updateEnabledMotions = (newState: motionTypeCode[]) => {
    setEnabledMotionTypes(newState);
    props.onFiltersChange(newState);
  };

  return (
    <div
      className={
        props.hidden
          ? "bg-transparent border-2 border-neutral-800 p-3 rounded-lg m-4"
          : "bg-transparent border-2 border-neutral-800 p-3 rounded-lg m-4 hidden"
      }
    >
      <h5 className="text-center font-bold m-2">{useLang("motionFilterTitle")}</h5>
      <GenericButton
        text={useLang("applyFilterButtonText")}
        icon={IconFilter}
        onClick={() => {
          // TO-DO: Make apply filters button work
          // if (
          //   motion?.type &&
          //   motion?.lang &&
          //   !(
          //     enabledMotions.includes(motion?.type as any) &&
          //     enabledLanguages.includes(motion?.lang)
          //   )
          // )
          //   setMotion(generateMotion());
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
        {motionTypesObjects.map((motionType) => (
          <Checkbox
            key={motionType.type}
            name="motionType"
            value={motionType.type}
            // TO-DO: Don't use the useLang hook in a callback
            labelText={useLang(motionType.type)}
            // TO-DO: Prevent checked motion types from being disabled when the language is filtered out
            disabled={
              !(
                enabledMotionTypes.includes(motionType.type) &&
                enabledLanguages.includes(motionType.lang)
              )
            }
            onChange={applyMotionTypeFilter}
          />
        ))}
      </section>
    </div>
  );
};
export { MotionsFilter };
