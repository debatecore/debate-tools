import { useContext } from "react";
import { LangContext } from "@/contexts/LangContext";
import { useLang } from "./useLang";
import strings from "@/data/strings.json";

const localizedCardinalNumeralsArray = ["minutes", "seconds"] as const;

type localizedCardinalNumeral = (typeof localizedCardinalNumeralsArray)[number];
export type { localizedCardinalNumeral };

const useLocalizedCardinalNumeral = (
  count: number,
  token: localizedCardinalNumeral
) => {
  const langContext = useContext(LangContext);
  const currentLanguage = langContext.lang;
  switch (currentLanguage) {
    case "pl":
      return polishLocalizedCardinalNumeral(count, token);
    default:
      return defaultLocalizedCardinalNumeral(count, token);
  }
};

const polishLocalizedCardinalNumeral = (
  count: number,
  token: localizedCardinalNumeral
) => {
  switch (token) {
    case "minutes":
      return localizedMinutesPl(count);
    case "seconds":
      return localizedSecondsPl(count);
    default:
      throw new Error("Polish general numeral not localized");
  }
};

const localizedMinutesPl = (count: number) => {
  if (count == 0) {
    return "minut";
  }
  if (count == 1) {
    return "minuta";
  }
  if (count >= 2 && count <= 4) {
    return "minuty";
  }
  if (count >= 5 && count <= 21) {
    return "minut";
  }
};

const localizedSecondsPl = (count: number) => {
  if (count == 0) {
    return "sekund";
  }
  if (count == 1) {
    return "sekunda";
  }
  if (count >= 2 && count <= 4) {
    return "sekundy";
  }
  if (count >= 5 && count <= 21) {
    return "sekund";
  }
};

const defaultLocalizedCardinalNumeral = (
  count: number,
  token: localizedCardinalNumeral
) => {
  if (count == 1) {
    return useLang(`${token}Singular` as keyof typeof strings);
  }
  return useLang(`${token}Plural`);
};

export { useLocalizedCardinalNumeral };
