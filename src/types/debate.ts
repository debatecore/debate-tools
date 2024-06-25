import { defaultSoundPack, soundPack } from "./soundPack";

const displayImageTypeArray = [
  "null",
  "MOW2024",
  "MOW2018",
  "PND2024",
  "ZSK",
  "custom",
] as const;
export { displayImageTypeArray };

type displayImageType = (typeof displayImageTypeArray)[number];

type debateConf = {
  motion: string;
  proTeam: string;
  oppTeam: string;
  speechTime: number; // in seconds
  adVocemTime: number; // in seconds
  endProtectedTime: number; // in seconds
  startProtectedTime: number; // in seconds
  beepOnSpeechEnd: boolean;
  beepProtectedTime: boolean;
  visualizeProtectedTimes: boolean;
  clockImageName: displayImageType;
  customClockImageBase64: string;
  soundPack: soundPack;
};
export type { debateConf, displayImageType };

const defaultDebateConf: debateConf = {
  motion: "",
  proTeam: "",
  oppTeam: "",
  speechTime: 300,
  adVocemTime: 60,
  endProtectedTime: 30,
  startProtectedTime: 0,
  beepOnSpeechEnd: true,
  beepProtectedTime: true,
  visualizeProtectedTimes: false,
  clockImageName: "null",
  customClockImageBase64: "",
  soundPack: defaultSoundPack,
};
export { defaultDebateConf };
