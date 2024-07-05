import { useContext } from "react";
import { LangContext } from "@/contexts/LangContext";
import { useLang } from "./useLang";
import strings from "@/data/strings.json";

const localizedGrammaticalNumbersArray = ["minutes"] as const;

type localizedGrammaticalNumber =
  (typeof localizedGrammaticalNumbersArray)[number];
export type { localizedGrammaticalNumber };

const useLocalizedGrammaticalNumber = (
  count: number,
  token: localizedGrammaticalNumber
) => {
  const defaultForms = {
    singular: useLang(`${token}Singular`) as keyof typeof strings,
    plural: useLang(`${token}Plural`) as keyof typeof strings,
  };
  const langContext = useContext(LangContext);
  const currentLanguage = langContext.lang;

  if (currentLanguage == "pl") {
    return polishLocalizedGrammaticalNumber(count, token);
  }
  return defaultLocalizedGrammaticalNumber(count, defaultForms);
};

const polishLocalizedGrammaticalNumber = (
  count: number,
  token: localizedGrammaticalNumber
) => {
  switch (token) {
    case "minutes":
      return localizedMinutesPl(count);
    default:
      throw new Error("Polish general numeral not localized");
  }
};

const localizedMinutesPl = (count: number) => {
  if (count % 100 >= 12 && count % 100 <= 21) return "minut";
  if (count % 10 >= 2 && count % 10 <= 4) return "minuty";
  if (count == 1) return "minuta";
  return "minut";
};

export { localizedMinutesPl };

const defaultLocalizedGrammaticalNumber = (
  count: number,
  forms: {
    singular: keyof typeof strings;
    plural: keyof typeof strings;
  }
) => {
  if (count == 1) return forms.singular;
  return forms.plural;
};

export { useLocalizedGrammaticalNumber };
