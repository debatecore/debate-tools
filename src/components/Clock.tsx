"use client";
import { DebateContext } from "@/contexts/DebateContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useInterval } from "react-use";
import Image from "next/image";

const Clock = (props: { running: boolean; maxtime: number }) => {
  const debate = useContext(DebateContext);
  const [time, setTime] = useState<number>(props.maxtime);
  const refCircle = useRef<SVGCircleElement>(null);

  const delay = 1000; // ms

  useEffect(() => setTime(props.maxtime), [props.running]);
  useInterval(() => setTime(time - 1), props.running ? delay : null);
  return (
    <>
      <div className="aspect-square w-[65%] flex flex-col space-y-1 justify-center items-center relative select-none">
        <h2 className="text-5xl z-30">
          {Math.floor(time / 60) < 10 && "0"}
          {Math.floor(time / 60)}
          {":"}
          {Math.floor(time % 60) < 10 && Math.floor(time % 60) !== 0 && "0"}
          {Math.floor(time % 60)}
          {Math.floor(time % 60) === 0 && "0"}
        </h2>
        <p className="text-neutral-500 uppercase z-30">{"time left"}</p>
        {/* INFORM */}
        {/* ------ */}
        {/* VISUAL */}
        <div className="absolute w-full h-full flex justify-center items-center">
          {/* OUTER RING - GREEN DISAPPEARING RING */}
          <svg
            className="z-20 -rotate-90 text-emerald-400"
            width={256}
            height={256}
          >
            <circle
              ref={refCircle}
              stroke="currentColor"
              fill="transparent"
              r={118}
              cx={128}
              cy={128}
              strokeWidth={5}
              strokeDashoffset={
                118 * 2 * Math.PI - (time / props.maxtime) * (118 * 2 * Math.PI)
              }
              strokeDasharray={refCircle.current?.getTotalLength()}
              style={props.running ? { transitionDuration: "350ms" } : {}}
            />
          </svg>
        </div>
        {/* OUTER RING - GRAY STATIC RING UNDERNEATH GREEN */}
        <div className="absolute w-full h-full flex justify-center items-center">
          <svg
            className={`z-10 -rotate-90 ${
              props.running && time !== props.maxtime
                ? "text-neutral-800"
                : "text-emerald-400"
            }`}
            width={256}
            height={256}
          >
            <circle
              stroke="currentColor"
              fill="transparent"
              r={118}
              cx={128}
              cy={128}
              strokeWidth={5}
            />
          </svg>
        </div>
        {debate.conf.displayImage1 === "Musketeers of Words" && (
          <div className="absolute w-full h-full flex justify-center items-center">
            <Image
              src={"/displayimages/Musketeer.png"}
              alt="Musketeers of Words logo"
              width={80}
              height={64}
              className="pt-32"
            />
          </div>
        )}
      </div>
    </>
  );
};

export { Clock };
