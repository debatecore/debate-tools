const soundPackNamesArray = ["default", "ZTM Poznań"] as const;
export { soundPackNamesArray };

type soundPackName = (typeof soundPackNamesArray)[number];
export { type soundPackName };

type soundPack = {
  name: soundPackName;
  pingProtectedTime: string;
  pingSpeechEnd: string;
  adVocemSound?: string;
  debateEndSound?: string;
};

export { type soundPack };

const soundPacks: Array<soundPack> = [
  {
    name: "default",
    pingProtectedTime: "/ping.mp3",
    pingSpeechEnd: "/ping2.mp3",
  },
  {
    name: "ZTM Poznań",
    pingProtectedTime: "/KBING! - Gong.mp3",
    pingSpeechEnd: "/KBING! - Gong.mp3",
    adVocemSound: "/KZADAN.mp3",
    debateEndSound: "/KONCTR.mp3",
  },
] as const;
export { soundPacks };

const defaultSoundPack: soundPack = {
  name: "default",
  pingProtectedTime: "/ping.mp3",
  pingSpeechEnd: "/ping2.mp3",
};
export { defaultSoundPack };
