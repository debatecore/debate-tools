import { useContext } from "react";
import { LangContext } from "@/contexts/LangContext";
import strings from "@/data/strings.json";
import { language } from "@/types/language";

const useLang = (token: keyof typeof strings) => {
  const langContext = useContext(LangContext);
  return (
    (strings[token] as Record<language, string>)[langContext.lang] ||
    strings[token]["en"]
  );
};

const getSpecificLangString = (token: keyof typeof strings, lang: language) => {
  return (
    (strings[token] as Record<language, string>)[lang] || strings[token]["en"]
  );
};

export { useLang, getSpecificLangString };
