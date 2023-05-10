import { useContext } from "react";
import en from "../data/en.json";
import pl from "../data/pl.json";
import { LangContext } from "@/contexts/LangContext";

type tokens =
  | "debateTools"
  | "madeWithLove"
  | "settings"
  | "language"
  | "theme"
  | "themeSystem"
  | "themeLight"
  | "themeDark"
  | "themeProjector"
  | "oxfDebateUtility"
  | "ladderGen"
  | "motionGen";
export type { tokens };

const useLang = (token: tokens) => {
  const context = useContext(LangContext);
  if (context?.lang === "pl") {
    return pl[token];
  } else {
    return en[token];
  }
};
export { useLang };
