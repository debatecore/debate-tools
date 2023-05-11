import { Dispatch, SetStateAction, createContext } from "react";

type debateType = {
  motion: string;
  proTeam: string;
  oppTeam: string;
  speechTime: number;
  protectedTime: number;
  adVocemTime: number;
};
export type { debateType };

const defaultDebate: debateType = {
  motion: "",
  proTeam: "",
  oppTeam: "",
  speechTime: 240,
  protectedTime: 30,
  adVocemTime: 60,
};
export { defaultDebate };

// increment this on changes to debateType
const debateStorageField = "debateconfigv5";
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
    adVocemTime: 60,
  },
  {
    motion: "TH regrets the narrative that forgiveness is a virtue.",
    proTeam: "VI LO Bydgoszcz Team I",
    oppTeam: "33 LO Warszawa",
    speechTime: 240,
    protectedTime: 30,
    adVocemTime: 60,
  },
  {
    motion: "Consumers should try to buy local goods and services.",
    proTeam: "Technikum Komunikacji PŃ - 4C",
    oppTeam: "Technikum Komunikacji PŃ - 2D",
    speechTime: 120,
    protectedTime: 30,
    adVocemTime: 0,
  },
];
export { sampleDebates };
