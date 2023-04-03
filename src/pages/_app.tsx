import type { AppProps } from "next/app";
import "@/styles/root.css";

import { createContext, Dispatch, SetStateAction, useState } from "react";

type debate = {
  motion: string;
  proTeam: string;
  oppTeam: string;
  speechTime: number;
};
export type { debate };

const DebateContext = createContext<{
  data: debate;
  setData: Dispatch<SetStateAction<debate>>;
} | null>(null);
export { DebateContext };

export default function App({ Component, pageProps }: AppProps) {
  const [data, setData] = useState<debate>({
    motion: "No motion provided.",
    proTeam: "Anonymous Team",
    oppTeam: "Anonymous Team",
    speechTime: 240,
  });
  return (
    <DebateContext.Provider value={{ data, setData }}>
      <Component {...pageProps} />
    </DebateContext.Provider>
  );
}
