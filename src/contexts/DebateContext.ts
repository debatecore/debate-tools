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
    motion: "TH regrets the narrative saying that forgiveness is a virtue.",
    proTeam: "",
    oppTeam: "",
    speechTime: 240,
    protectedTime: 30,
  },
];
