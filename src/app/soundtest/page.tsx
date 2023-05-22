"use client";
import { useAudio } from "react-use";

export default function PageSoundTest() {
  const ping = {
    data: useAudio({
      src: "/ping.mp3",
    }),
  };
  const ping2 = {
    data: useAudio({
      src: "/ping2.mp3",
    }),
  };
  const button = `p-2 rounded bg-daisy-bush-600 text-white
									border border-transparent
									hover:bg-daisy-bush-800 hover:border-daisy-bush-400`;
  return (
    <>
      <div className="flex flex-col gap-2 text-center pt-10 max-w-xs mx-auto">
        <p className="font-bold text-3xl">sound test</p>
        {ping.data[0]}
        {ping2.data[0]}
        <button
          className={button}
          onClick={() => {
            ping.data[2].play();
          }}
        >
          single ping
        </button>
        <button
          className={button}
          onClick={() => {
            ping2.data[2].play();
          }}
        >
          double ping
        </button>
      </div>
    </>
  );
}
