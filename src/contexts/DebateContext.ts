import { Dispatch, SetStateAction, createContext } from "react";

type debateType = {
  motion: string;
  proTeam: string;
  oppTeam: string;
  speechTime: number;
  adVocemTime: number;
  protectedTime: number;
  showProtectedTime: boolean;
  beepProtectedTime: boolean;
};
export type { debateType };

const defaultDebate: debateType = {
  motion: "",
  proTeam: "",
  oppTeam: "",
  speechTime: 240,
  adVocemTime: 60,
  protectedTime: 30,
  showProtectedTime: false,
  beepProtectedTime: true,
};
export { defaultDebate };

// increment this on changes to debateType
const debateStorageField = "debateconfigv6";
export { debateStorageField };

const DebateContext = createContext<{
  data: debateType;
  setData: Dispatch<SetStateAction<debateType>>;
} | null>(null);
export { DebateContext };

const sampleDebate: debateType = {
  motion: "THW abolish the UN Security Council.",
  proTeam: "38 Dwujęzyczne Liceum w Poznaniu",
  oppTeam: "Technikum Komunikacji w Poznaniu",
  speechTime: 240,
  protectedTime: 30,
  adVocemTime: 60,
  showProtectedTime: false,
  beepProtectedTime: true,
};
export { sampleDebate };

const sampleDebates: debateType[] = [
  {
    motion: "THW abolish the UN Security Council.",
    proTeam: "38 Dwujęzyczne Liceum w Poznaniu",
    oppTeam: "Technikum Komunikacji w Poznaniu",
    speechTime: 240,
    protectedTime: 30,
    adVocemTime: 60,
    showProtectedTime: false,
    beepProtectedTime: true,
  },
  {
    motion: "TH regrets the narrative that forgiveness is a virtue.",
    proTeam: "VI LO Bydgoszcz Team I",
    oppTeam: "33 LO Warszawa",
    speechTime: 240,
    protectedTime: 30,
    adVocemTime: 60,
    showProtectedTime: false,
    beepProtectedTime: true,
  },
  {
    motion: "Consumers should try to buy local goods and services.",
    proTeam: "Technikum Komunikacji PŃ - 4C",
    oppTeam: "Technikum Komunikacji PŃ - 2D",
    speechTime: 120,
    protectedTime: 30,
    adVocemTime: 0,
    showProtectedTime: true,
    beepProtectedTime: true,
  },
];
export { sampleDebates };
