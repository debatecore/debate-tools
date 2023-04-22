import { OneContext } from "@/pages/_app";
import en from "../data/en.json";
import pl from "../data/pl.json";
import { useContext } from "react";

type tokens = "SITE_TITLE" | "MADE_WITH" | "DEBATE_TOOL" | "LADDER_TOOL";

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
