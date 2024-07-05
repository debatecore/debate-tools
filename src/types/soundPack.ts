const soundPackNamesArray = ["default", "ZTM Poznań"] as const;
export { soundPackNamesArray };

type soundPackName = (typeof soundPackNamesArray)[number];
export { type soundPackName };

type soundPack = {
  name: soundPackName;
  volumeOverride?: number;
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
  volumeOverride: 0.2,
  pingProtectedTime: "/KBING!.mp3",
  pingSpeechEnd: "/KBING!.mp3",
  adVocemSound: "/KZADAN.mp3",
  debateEndSound: "/KONCTR.mp3",
};
export { ztmPoznańSoundPack };

const soundPacks: soundPack[] = [defaultSoundPack, ztmPoznańSoundPack] as const;
export { soundPacks };
