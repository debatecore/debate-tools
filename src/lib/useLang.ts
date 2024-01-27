import { useContext } from "react";
import { LangContext } from "@/contexts/LangContext";
import strings from "@/data/strings.json";
import { languages } from "@/types/language";

const useLang = (token: keyof typeof strings) => {
  let lang: languages = "en";
  return (
    (strings[token] as Record<languages, string>)[lang] || strings[token]["en"]
  );
};

export { useLang };
