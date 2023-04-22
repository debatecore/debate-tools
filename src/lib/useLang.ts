import { OneContext } from "@/pages/_app";
import en from "../data/en.json";
import pl from "../data/pl.json";
import { useContext } from "react";

type tokens =
  | "SITE_TITLE"
  | "MADE_WITH"
  | "DEBATE_TOOL"
  | "LADDER_TOOL"
  | "DEBATE_MOTION"
  | "DEBATE_MOTION_DESC"
  | "PROPOSITION_TEAM"
  | "PROPOSITION_TEAM_DESC"
  | "OPPOSITION_TEAM"
  | "OPPOSITION_TEAM_DESC"
  | "SPEECH_TIME"
  | "SPEECH_TIME_DESC"
  | "PROTECTED_TIME"
  | "PROTECTED_TIME_DESC"
  | "RESET_DEBATE_SETTINGS"
  | "CONDUCT_DEBATE"
  | "AN_OXFORD_FORMAT_DEBATE"
  | "AS_PROPO"
  | "AS_OPPO"
  | "TIME_LEFT"
  | "SECONDS_OVERTIME"
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
  | "STAGE_8_BTN";
export type { tokens };

function useLang(token: tokens): string {
  const config = useContext(OneContext);
  if (config?.lang === "en") {
    return en[token];
  } else if (config?.lang === "pl") {
    return pl[token];
  } else {
    return "unknown language";
  }
}
export { useLang };
