import { useContext } from "react";
import { LangContext } from "@/contexts/LangContext";
import strings from "@/data/strings.json";
import { languages } from "@/types/language";

const useLang = (token: keyof typeof strings) => {
  const lang: languages = "en";
  return lang in strings[token] ? strings[token][lang] : strings[token]["en"];
};

export { useLang };
