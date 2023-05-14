import { Dispatch, SetStateAction, createContext } from "react";

type language = "en" | "pl";
export type { language };

const LangContext = createContext<{
  lang: language;
  setLang: Dispatch<SetStateAction<language>>;
} | null>(null);
export { LangContext };
