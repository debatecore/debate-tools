import { useContext } from "react";
import { LangContext } from "@/contexts/LangContext";
import strings from "@/data/strings.json";
import { languages } from "@/types/language";

const useLang = (token: keyof typeof strings) => {
  const langContext = useContext(LangContext);
  return (
    (strings[token] as Record<languages, string>)[langContext.lang] ||
    strings[token]["en"]
  );
};

export { useLang };
