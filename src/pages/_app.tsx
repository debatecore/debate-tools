import type { AppProps } from "next/app";
import "@/styles/root.css";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type debate = {
  motion: string;
  proTeam: string;
  oppTeam: string;
  speechTime: number;
  protectedTime: number;
};
export type { debate };

const defaultDebate: debate = {
  motion: "No motion provided.",
  proTeam: "Anonymous Team 1",
  oppTeam: "Anonymous Team 2",
  speechTime: 240,
  protectedTime: 30,
};
export { defaultDebate };

const OneContext = createContext<{
  lang: language;
  setLang: Dispatch<SetStateAction<language>>;
  debate: debate;
  setDebate: Dispatch<SetStateAction<debate>>;
} | null>(null);
export { OneContext };

const debateConfig = "debateconfigv3";

type language = "en" | "pl";
export type { language };

export default function App({ Component, pageProps }: AppProps) {
  const [initialData, setInitialData] = useState<boolean>(false);
  const [lang, setLang] = useState<language>("en");
  const [debate, setDebate] = useState<debate>(defaultDebate);
  useEffect(() => {
    if (typeof localStorage == "undefined") return;
    if (initialData) {
      localStorage.setItem(debateConfig, JSON.stringify(debate));
      localStorage.setItem("sitelang", lang);
    } else {
      setInitialData(true);
      if (localStorage.getItem(debateConfig)) {
        setDebate(JSON.parse(localStorage.getItem(debateConfig) || ""));
      }
      if (localStorage.getItem("sitelang")) {
        setLang(localStorage.getItem("sitelang") === "pl" ? "pl" : "en");
      }
    }
  }, [initialData, debate, lang]);
  return (
    <OneContext.Provider value={{ lang, setLang, debate, setDebate }}>
      <Component {...pageProps} />
    </OneContext.Provider>
  );
}
