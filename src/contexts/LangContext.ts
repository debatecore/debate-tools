import { languages } from "@/types/language";
import { createContext } from "react";

const LangContext = createContext<{
  lang: languages;
  setLang: (lang: languages) => void;
}>({
  lang: "en",
  setLang: (lang) => {},
});
export { LangContext };
