import { languages } from "@/types/language";
import { createContext } from "react";

const LangContext = createContext<{
  lang: languages;
  setLang: (lang: languages) => void;
} | null>(null);
export { LangContext };
