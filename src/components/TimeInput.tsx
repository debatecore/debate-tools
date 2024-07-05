"use client";

import { useLang } from "@/lib/useLang";
import { useLocalizedGrammaticalNumber } from "@/lib/useLocalizedGrammaticalNumber";

const TimeInput = (props: {
  time: number;
  setTime: (time: number) => void;
}) => {
  const minutesCount = Math.floor(props.time / 60);
  const secondsCount = Math.floor(props.time % 60);
  const minutesGrammaticalNumber = useLocalizedGrammaticalNumber(
    minutesCount,
    "minutes"
  );
  const secondsPlural = useLang("secondsPlural");

  return (
    <div className="flex flex-col lg:flex-row lg:gap-4 items-center">
      <div className="flex flex-row">
        <button
          className="px-3 border-2 hover:bg-neutral-800 border-neutral-800 hover:border-neutral-700 rounded-l disabled:text-neutral-500 disabled:hover:bg-transparent disabled:hover:border-neutral-800 disabled:cursor-not-allowed"
          disabled={!(props.time - 60 >= 0)}
          onClick={() => {
            if (props.time - 60 >= 0) props.setTime(props.time - 60);
          }}
        >
          -
        </button>
        <div className="border-y-2 border-neutral-800 min-w-32 flex flex-row justify-center p-2">
          {minutesCount}
          {`  ${minutesGrammaticalNumber}`}
        </div>
        <button
          className="px-3 border-2 hover:bg-neutral-800 border-neutral-800 hover:border-neutral-700 rounded-r disabled:text-neutral-500 disabled:hover:bg-transparent disabled:hover:border-neutral-800 disabled:cursor-not-allowed"
          onClick={() => props.setTime(props.time + 60)}
        >
          +
        </button>
      </div>
      <p>{useLang("and")}</p>
      <div className="flex flex-row">
        <button
          className="px-3 border-2 hover:bg-neutral-800 border-neutral-800 hover:border-neutral-700 rounded-l disabled:text-neutral-500 disabled:hover:bg-transparent disabled:hover:border-neutral-800 disabled:cursor-not-allowed"
          disabled={!(props.time - 15 >= 0)}
          onClick={() => {
            if (props.time - 15 >= 0) props.setTime(props.time - 15);
          }}
        >
          -
        </button>
        <div className="border-y-2 border-neutral-800 min-w-32 flex flex-row justify-center p-2">
          {secondsCount}
          {` ${secondsPlural}`}
        </div>
        <button
          className="px-3 border-2 hover:bg-neutral-800 border-neutral-800 hover:border-neutral-700 rounded-r disabled:text-neutral-500 disabled:hover:bg-transparent disabled:hover:border-neutral-800 disabled:cursor-not-allowed"
          onClick={() => props.setTime(props.time + 15)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export { TimeInput };
