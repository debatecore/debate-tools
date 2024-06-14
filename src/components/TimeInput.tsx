"use client";

import { LangContext } from "@/contexts/LangContext";
import { useLang } from "@/lib/useLang";
import { useContext } from "react";

const TimeInput = (props: {
  time: number;
  setTime: (time: number) => void;
}) => {
  const currentLang = useContext(LangContext).lang;
  const minutesCount = Math.floor(props.time / 60);
  const secondsCount = Math.floor(props.time % 60);
  const secondsPlural = useLang("secondsPlural");
  const minutesSingular = useLang("minutesSingular");
  const defaultMinutesPlural = useLang("minutesPlural");
  const minutesPlural = pluralMinutesTranslation();

  function pluralMinutesTranslation() {
    if (currentLang != "pl") {
      return defaultMinutesPlural;
    }
    const lastDigit = minutesCount % 10;
    if (lastDigit >= 2 && lastDigit <= 4) {
      return "minuty";
    }
    return "minut";
  }

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
          {minutesCount == 1 ? ` ${minutesSingular}` : ` ${minutesPlural}`}
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
