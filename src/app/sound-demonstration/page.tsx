"use client";
import { SoundPlayerButton } from "@/components/SoundPlayer";
import { IconBell } from "@/components/icons/Bell";
import { IconDoubleBell } from "@/components/icons/DoubleBell";
import { IconPoznanBus } from "@/components/icons/PoznanBus";
import { IconPoznanTram } from "@/components/icons/PoznanTram";
import { useLang } from "@/lib/useLang";

export default function SoundTestPage() {
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
            soundpath="ping.mp3"
            righticon={IconBell}
          />
          <SoundPlayerButton
            text={useLang("soundDemonstrationDoublePing")}
            soundpath="ping2.mp3"
            righticon={IconDoubleBell}
          />
        </div>
        <p className="text-center mt-4">{useLang("soundDemonstrationPoznanPack")}</p>
        <p className="text-neutral-500 px-2 text-justify sm:text-center sm:text-balance">
          {useLang("soundDemonstrationPoznanPackFlavortext")}
        </p>
        <div className="flex flex-row justify-center items-center gap-2 mt-4">
          <SoundPlayerButton
            text={useLang("soundDemonstrationTransitBell")}
            soundpath="KBING! - Gong.mp3"
            righticon={IconPoznanTram}
            righticonclasses="scale-x-[-1.85] scale-y-[1.85] right-[8px] top-[14px] rotate-[0]"
            lefticon={IconPoznanBus}
            lefticonclasses="scale-[2] top-[33px] left-[8px]"
          />
        </div>
      </div>
      <p className="text-neutral-600 px-2 p-2 text-justify sm:text-balance sm:text-center mt-auto mx-auto max-w-7xl">
        {useLang("soundDemonstrationDisclaimer")}
      </p>
    </div>
  );
}
