"use client";
import { useLang } from "@/lib/useLang";
import Link from "next/link";
import { useAudio } from "react-use";

export default function PageSoundTest() {
  const [audio1, state1, controls1] = useAudio({
    src: "/ping.mp3",
  });
  const [audio2, state2, controls2] = useAudio({
    src: "/ping2.mp3",
  });
  const button = `p-2 rounded bg-zinc-700 text-white
									border border-transparent
									hover:bg-zinc-600 hover:border-zinc-400`;
  const text1 = useLang("soundDemo");
  const text2 = useLang("soundDemoExpl");
  const textsingleping = useLang("singlePing");
  const textdoubleping = useLang("doublePing");
  const textback = useLang("back");

  return (
    <>
      <div className="flex flex-col gap-2 text-center pt-10 max-w-xs mx-auto">
        <p className="font-bold text-3xl">{text1}</p>
        <p className="text-justify text-zinc-400">{text2}</p>
        <div className="block h-10"></div>
        {audio1}
        {audio2}
        <button
          className={button}
          onClick={() => {
            controls1.seek(0);
            controls1.play();
          }}
        >
          {textsingleping}
        </button>
        <button
          className={button}
          onClick={() => {
            controls2.seek(0);
            controls2.play();
          }}
        >
          {textdoubleping}
        </button>
        <div className="flex flex-row">
          <Link tabIndex={-1} href="/">
            <button className="text-left text-zinc-400 hover:underline">
              {textback}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
