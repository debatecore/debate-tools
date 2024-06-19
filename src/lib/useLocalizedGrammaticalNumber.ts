import { useContext } from "react";
import { LangContext } from "@/contexts/LangContext";
import { useLang } from "./useLang";
import strings from "@/data/strings.json";

const localizedCardinalNumeralsArray = ["minutes"] as const;

type localizedGrammaticalNumber =
  (typeof localizedCardinalNumeralsArray)[number];
export type { localizedGrammaticalNumber };

const useLocalizedCardinalNumeral = (
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
    return polishLocalizedCardinalNumeral(count, token);
  }
  return defaultLocalizedCardinalNumeral(count, defaultForms);
};

const polishLocalizedCardinalNumeral = (
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

const defaultLocalizedCardinalNumeral = (
  count: number,
  forms: {
    singular: keyof typeof strings;
    plural: keyof typeof strings;
  }
) => {
  if (count == 1) return forms.singular;
  return forms.plural;
};

export { useLocalizedCardinalNumeral };
