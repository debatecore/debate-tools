"use client";
import {
  SoundPlayerButton,
  soundPlayerButtonType,
} from "@/components/SoundPlayer";
import { IconBell } from "@/components/icons/Bell";
import { useLang } from "@/lib/useLang";

export default function SoundTestPage() {
  return (
    <div>
      <h1 className="text-3xl mt-8 text-center font-serif">
        {useLang("soundDemonstration")}
      </h1>
      <p className="mb-8 text-center text-neutral-500">
        {useLang("soundDemonstrationSubtitle")}
      </p>
      <div className="max-w-4xl mx-auto">
        <p className="text-neutral-500 text-center text-balance">
          {useLang("soundDemonstrationSingleDoubleExpl")}
        </p>
        <div className="flex flex-row justify-center items-center gap-2 m-4">
          {[
            {
              text: "Single ping",
              soundpath: "ping.mp3",
              righticon: IconBell,
            },
            {
              text: "Double ping",
              soundpath: "ping2.mp3",
              righticon: IconBell,
            },
          ].map((el: soundPlayerButtonType) => {
            return (
              <SoundPlayerButton
                text={el.text}
                soundpath={el.soundpath}
                righticon={el.righticon}
                lefticon={el.lefticon}
                key={el.text}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
