"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { displayImageType } from "@/types/debate";
import { useAudio, useInterval } from "react-use";
import Image from "next/image";
import { useLang } from "@/lib/useLang";
import { DebateContext } from "@/contexts/DebateContext";

const Clock = (props: {
  running: boolean;
  maxtime: number;
  clockimage?: displayImageType;
  beepSpeechEnd?: boolean;
  beepProtected?: boolean;
  protectedTime?: number;
  protectStart?: boolean;
}) => {
  const [time, setTime] = useState<number>(props.maxtime);
  const refCircle = useRef<SVGCircleElement>(null);
  const conf = useContext(DebateContext).conf;

  const timeprotsound = ((res) => ({
    element: res[0],
    state: res[1],
    controls: res[2],
  }))(useAudio({ src: conf.soundPack.pingProtectedTime }));

  const endtalksound = ((res) => ({
    element: res[0],
    state: res[1],
    controls: res[2],
  }))(useAudio({ src: conf.soundPack.pingSpeechEnd }));

  const timeleft = useLang("timeleft");
  const overtime = useLang("overtime");

  const delay = 1000; // ms
  const fullvolume = 1; // useAudio volume range is 0-1

  useEffect(() => {
    timeprotsound.controls.volume(conf.soundPack.volumeOverride || fullvolume);
    endtalksound.controls.volume(conf.soundPack.volumeOverride || fullvolume);
    if (props.beepSpeechEnd && time === 0) endtalksound.controls.play();
    // prettier-ignore
    if(props.beepProtected && props.protectedTime && time === props.protectedTime) timeprotsound.controls.play();
    // prettier-ignore
    if(props.beepProtected && props.protectedTime && props.protectStart && time === props.maxtime - props.protectedTime) timeprotsound.controls.play();
  }, [time]);

  useEffect(() => setTime(props.maxtime), [props.running, props.maxtime]);
  useInterval(() => setTime(time - 1), props.running ? delay : null);
  return (
    <>
      <div className="aspect-square min-w-64 flex flex-col space-y-1 justify-center items-center relative select-none">
        <h2 className="text-5xl z-30">
          {time > 0 && (
            <>
              {Math.floor(time / 60) < 10 && "0"}
              {Math.floor(time / 60)}
              {":"}
              {Math.floor(time % 60) < 10 && Math.floor(time % 60) !== 0 && "0"}
              {Math.floor(time % 60)}
              {Math.floor(time % 60) === 0 && "0"}
            </>
          )}
          {time <= 0 && time * -1}
        </h2>
        <p className="text-neutral-500 uppercase z-30">
          {time > 0 ? timeleft : overtime}
        </p>
        {/* INFORM */}
        {/* ------ */}
        {/* VISUAL */}
        <div className="absolute w-full h-full flex justify-center items-center">
          {/* OUTER RING - GREEN DISAPPEARING RING */}
          <svg
            className={`z-20 -rotate-90 ${
              time > 0 ? "text-emerald-400" : "text-transparent"
            }`}
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
              // style={props.running ? { transitionDuration: "350ms" } : {}}
              style={{ transitionDuration: "350ms" }}
            />
          </svg>
        </div>
        {/* OUTER RING - GRAY STATIC RING UNDERNEATH GREEN */}
        <div className="absolute w-full h-full flex justify-center items-center">
          <svg
            className={`z-10 -rotate-90 ${
              time === props.maxtime
                ? "text-emerald-400"
                : time <= 0
                ? "text-red-400"
                : "text-neutral-800"
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
              style={
                !props.running && time > 0
                  ? { transitionDuration: "350ms" }
                  : {}
              }
            />
          </svg>
        </div>
        {props.clockimage === "MOW2018" && (
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
        {props.clockimage === "MOW2024" && (
          <div className="absolute w-full h-full flex justify-center items-center">
            <Image
              src={"/displayimages/MOW.png"}
              alt="Musketeers of Words logo"
              width={60}
              height={60}
              className="mt-36 rounded-full"
            />
          </div>
        )}
        {timeprotsound.element}
        {endtalksound.element}
      </div>
    </>
  );
};

export { Clock };
