"use client";
import { useAudio } from "react-use";

export default function PageSoundTest() {
  const [audio1, state1, controls1] = useAudio({
    src: "/ping.mp3",
  });
  const [audio2, state2, controls2] = useAudio({
    src: "/ping2.mp3",
  });
  const button = `p-2 rounded bg-daisy-bush-600 text-white
									border border-transparent
									hover:bg-daisy-bush-800 hover:border-daisy-bush-400`;
  return (
    <>
      <div className="flex flex-col gap-2 text-center pt-10 max-w-xs mx-auto">
        <p className="font-bold text-3xl">sound test</p>
        {audio1}
        {audio2}
        <button
          className={button}
          onClick={() => {
            controls1.seek(0);
            controls1.play();
          }}
        >
          single ping
        </button>
        <button
          className={button}
          onClick={() => {
            controls2.seek(0);
            controls2.play();
          }}
        >
          double ping
        </button>
      </div>
    </>
  );
}
