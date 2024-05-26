import { LangContext } from "@/contexts/LangContext";
import { useLang, getSpecificLangString } from "@/lib/useLang";
import { langsArray, langsPublicBlacklist } from "@/types/language";
import { useContext } from "react";
import { GenericSelect } from "./GenericSelect";
import { FlagIcon } from "./FlagIcon";

const LangSwitchComponent = () => {
  const langContext = useContext(LangContext);
  return (
    <GenericSelect
      text={useLang("language")}
      value={getSpecificLangString("selfLanguageString", langContext.lang)}
      options={[
        ...langsArray
          .filter((lang) => !langsPublicBlacklist.includes(lang))
          .map((lang) => {
            return {
              icon: <FlagIcon lang={lang} />,
              value: getSpecificLangString("selfLanguageString", lang),
              exec: () => langContext.setLang(lang),
            };
          }),
      ]}
    />
  );
};
export { LangSwitchComponent };
