import { language } from "@/app/layout";
import { Dispatch, SetStateAction, createContext } from "react";

const LangContext = createContext<{
  lang: language;
  setLang: Dispatch<SetStateAction<language>>;
} | null>(null);
export { LangContext };
