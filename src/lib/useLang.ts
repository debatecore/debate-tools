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
  | "motionGen"
  | "debateConfig"
  | "backToMenu"
  | "resetDebateConfig"
  | "conductDebate"
  | "motion"
  | "motionDesc"
  | "proTeam"
  | "proTeamDesc"
  | "oppTeam"
  | "oppTeamDesc"
  | "speechTime"
  | "speechTimeDesc"
  | "protectedTime"
  | "protectedTimeDesc"
  | "adVocemTime"
  | "adVocemTimeDesc"
  | "sampleDebate"
  | "example"
  | "or"
  | "off"
  | "dontShow"
  | "seconds"
  | "minutes"
  | "minute"
  | "oxfordDebate"
  | "asPro"
  | "asOpp"
  | "timeLeft"
  | "secondsOverTime"
  | "secondsOverTime_1"
  | "secondsOverTime_2-3-4"
  | "STAGE_0"
  | "STAGE_1"
  | "STAGE_2"
  | "STAGE_3"
  | "STAGE_4"
  | "STAGE_5"
  | "STAGE_6"
  | "STAGE_7"
  | "STAGE_8"
  | "STAGE_0_0_BTN"
  | "STAGE_0_1_BTN"
  | "STAGE_1_0_BTN"
  | "STAGE_1_1_BTN"
  | "STAGE_2_0_BTN"
  | "STAGE_2_1_BTN"
  | "STAGE_3_0_BTN"
  | "STAGE_3_1_BTN"
  | "STAGE_4_0_BTN"
  | "STAGE_4_1_BTN"
  | "STAGE_5_0_BTN"
  | "STAGE_5_1_BTN"
  | "STAGE_6_0_BTN"
  | "STAGE_6_1_BTN"
  | "STAGE_7_0_BTN"
  | "STAGE_7_1_BTN"
  | "backtomenu"
  | "backtodebateconfig";
export type { tokens };

const useLang = (token: tokens) => {
  const context = useContext(LangContext);
  if (context?.lang === "pl") {
    return pl[token] || en[token] || token;
  } else {
    return en[token] || token;
  }
};
export { useLang };
