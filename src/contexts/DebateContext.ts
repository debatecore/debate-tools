import { Dispatch, SetStateAction, createContext } from "react";

type debateType = {
  motion: string;
  proTeam: string;
  oppTeam: string;
  speechTime: number;
  protectedTime: number;
};
export type { debateType };

const defaultDebate: debateType = {
  motion: "Si vis pacem, para bellum.",
  proTeam: "Anonymous",
  oppTeam: "Anonymous",
  speechTime: 240,
  protectedTime: 30,
};
export { defaultDebate };

// increment this on changes to debateType
const debateStorageField = "debateconfigv4";
export { debateStorageField };

const DebateContext = createContext<{
  data: debateType;
  setData: Dispatch<SetStateAction<debateType>>;
} | null>(null);
export { DebateContext };

const sampleDebates: debateType[] = [
  {
    motion: "THW abolish the UN Security Council.",
    proTeam: "38 Dwujęzyczne Liceum w Poznaniu",
    oppTeam: "Technikum Komunikacji w Poznaniu",
    speechTime: 240,
    protectedTime: 30,
  },
  {
    motion: "TH regrets the narrative that forgiveness is a virtue.",
    proTeam: "",
    oppTeam: "",
    // VI LO, Bydgoszcz (Team I)
    // vs.
    // 33 LO, Warszawa
    speechTime: 240,
    protectedTime: 30,
  },
  {
    motion: "Consumers should try to buy local goods and use local services",
    proTeam: "Technikum Komunikacji PŃ - 4C",
    oppTeam: "Technikum Komunikacji PŃ - 2D",
    speechTime: 120,
    protectedTime: 30,
  },
];
export { sampleDebates };
