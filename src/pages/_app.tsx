import type { AppProps } from "next/app";
import "@/styles/root.css";

import { createContext, Dispatch, SetStateAction, useState } from "react";

type debate = {
  format: "oxford" | "britparliamentary";
  motion: string;
  proTeam: string;
  oppTeam: string;
  speechTime: number;
  protectedTime: number;
  allowAdVocem: boolean;
  showProtectedTime: boolean;
  showAdVocemAvailability: boolean;
  playSoundOnSpeechLimits: boolean;
  playSoundOnProtectedTime: boolean;
  playedSoundSelection: "knock" | "bell" | "duck";
  // figure out how to handle questions ?
};
export type { debate };

const defaultDebate: debate = {
  format: "oxford",
  motion: "No motion provided.",
  proTeam: "Anonymous Team 1",
  oppTeam: "Anonymous Team 2",
  speechTime: 240,
  protectedTime: 30,
  allowAdVocem: false,
  showProtectedTime: false,
  showAdVocemAvailability: false,
  playSoundOnSpeechLimits: false,
  playSoundOnProtectedTime: false,
  playedSoundSelection: "bell",
};
export { defaultDebate };

const DebateContext = createContext<{
  data: debate;
  setData: Dispatch<SetStateAction<debate>>;
} | null>(null);
export { DebateContext };

export default function App({ Component, pageProps }: AppProps) {
  const [data, setData] = useState<debate>(defaultDebate);
  return (
    <DebateContext.Provider value={{ data, setData }}>
      <Component {...pageProps} />
    </DebateContext.Provider>
  );
}
