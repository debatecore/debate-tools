"use client";
import { SoundPlayerButton } from "@/components/SoundPlayer";
import { IconAlertCircle } from "@/components/icons/AlertCircle";
import { IconBell } from "@/components/icons/Bell";
import { IconDoubleBell } from "@/components/icons/DoubleBell";
import { IconPoznanBus } from "@/components/icons/PoznanBus";
import { IconPoznanTram } from "@/components/icons/PoznanTram";
import { IconTrophy } from "@/components/icons/Trophy";
import { useLang } from "@/lib/useLang";
import { defaultSoundPack, ztmPoznańSoundPack } from "@/types/soundPack";

export default function SoundTestPage() {
  const adVocemText = useLang("adVocem");
  const debateEndText = useLang("debateEnd");

  const ztmAdVocemSound = ztmPoznańSoundPack.adVocemSound;
  const ztmDebateEndSound = ztmPoznańSoundPack.debateEndSound;
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl mt-8 text-center font-serif">
        {useLang("soundDemonstration")}
      </h1>
      <p className="mb-8 text-center text-neutral-500">
        {useLang("soundDemonstrationSubtitle")}
      </p>
      <div className="max-w-4xl mx-auto flex flex-col">
        <p className="text-center">Stock sounds</p>
        <p className="text-neutral-500 px-2 text-justify sm:text-center sm:text-balance">
          {useLang("soundDemonstrationSingleDoubleExpl")}
        </p>
        <div className="flex flex-col md:flex-row justify-center flex-wrap items-center gap-2 mt-4">
          <SoundPlayerButton
            text={useLang("soundDemonstrationSinglePing")}
            soundpath={defaultSoundPack.pingProtectedTime}
            righticon={IconBell}
          />
          <SoundPlayerButton
            text={useLang("soundDemonstrationDoublePing")}
            soundpath={defaultSoundPack.pingSpeechEnd}
            righticon={IconDoubleBell}
          />
        </div>
        <p className="text-center mt-4">{useLang("soundDemonstrationPoznanPack")}</p>
        <p className="text-neutral-500 px-2 text-justify sm:text-center sm:text-balance">
          {useLang("soundDemonstrationPoznanPackFlavortext")}
        </p>
        <div className="flex flex-col justify-center items-center gap-2 mt-4">
          <SoundPlayerButton
            text={useLang("soundDemonstrationTransitBell")}
            soundpath={ztmPoznańSoundPack.pingProtectedTime}
            lefticon={IconPoznanBus}
            lefticonclasses="scale-[2] top-[33px] left-[8px]"
            righticon={IconPoznanTram}
            righticonclasses="scale-x-[-1.85] scale-y-[1.85] right-[8px] top-[14px] rotate-[0]"
          />
          {ztmAdVocemSound && (
            <SoundPlayerButton
              text={adVocemText}
              lefticon={IconPoznanBus}
              lefticonclasses="scale-[2] top-[33px] left-[8px]"
              soundpath={ztmAdVocemSound}
              righticon={IconAlertCircle}
              righticonclasses="scale-x-[2] scale-y-[2] right-[25px] top-[17px] rotate-[0]"
            />
          )}
          {ztmDebateEndSound && (
            <SoundPlayerButton
              text={debateEndText}
              soundpath={ztmDebateEndSound}
              lefticon={IconTrophy}
              lefticonclasses="scale-[2] top-[17px] left-[25px]"
              righticon={IconPoznanTram}
              righticonclasses="scale-x-[-1.85] scale-y-[1.85] right-[8px] top-[14px] rotate-[0]"
            />
          )}
        </div>
      </div>
      <p className="text-neutral-600 px-2 p-2 text-justify sm:text-balance sm:text-center mt-auto mx-auto max-w-7xl">
        {useLang("soundDemonstrationDisclaimer")}
      </p>
    </div>
  );
}
