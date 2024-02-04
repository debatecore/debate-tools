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
};
export type { debateConf };

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
};
export { defaultDebateConf };
