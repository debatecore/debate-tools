import en from "../data/en.json";
import pl from "../data/pl.json";

type tokens =
  | "debateTools"
  | "madeWithLove"
  | "settings"
  | "language"
  | "theme"
  | "oxfDebateUtility"
  | "ladderGen";
export type { tokens };

const useLang = (token: tokens) => {
  return en[token];
};
export { useLang };
