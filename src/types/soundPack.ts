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

const defaultSoundPack: soundPack = {
  name: "default",
  pingProtectedTime: "/ping.mp3",
  pingSpeechEnd: "/ping2.mp3",
};
export { defaultSoundPack };

const ztmPoznańSoundPack: soundPack = {
  name: "ZTM Poznań",
  pingProtectedTime: "/KBING!",
  pingSpeechEnd: "/KBING! - Gong.mp3",
  adVocemSound: "/KZADAN.mp3",
  debateEndSound: "/KONCTR.mp3",
};
export { ztmPoznańSoundPack };

const soundPacks: Array<soundPack> = [defaultSoundPack, ztmPoznańSoundPack] as const;
export { soundPacks };
