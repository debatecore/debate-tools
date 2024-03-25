const displayImageTypeArray = ["null", "MOW2024", "MOW2018"] as const;
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
  displayImage1: displayImageType; // CLOCK IMAGE DISPLAY
};
export type { debateConf, displayImageType };

const defaultDebateConf: debateConf = {
  motion: "",
  proTeam: "",
  oppTeam: "",
  speechTime: 240,
  adVocemTime: 60,
  endProtectedTime: 30,
  startProtectedTime: 0,
  beepOnSpeechEnd: true,
  beepProtectedTime: true,
  visualizeProtectedTimes: false,
  displayImage1: "null",
};
export { defaultDebateConf };
