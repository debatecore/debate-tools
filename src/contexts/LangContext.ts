import { language } from "@/types/language";
import { createContext } from "react";

const LangContext = createContext<{
  lang: language;
  setLang: (lang: language) => void;
}>({
  lang: "en",
  setLang: (lang) => {},
});
export { LangContext };
