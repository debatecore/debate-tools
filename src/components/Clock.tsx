"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { displayImageType } from "@/types/debate";
import { useAudio, useInterval } from "react-use";
import { useLang } from "@/lib/useLang";
import { DebateContext } from "@/contexts/DebateContext";
import { ClockDisplayImage } from "./ClockDisplayImage";

const Clock = (props: {
  running: boolean;
  maxTime: number;
  clockImage?: displayImageType;
  beepSpeechEnd?: boolean;
  beepProtected?: boolean;
  protectedTime?: number;
  protectStart?: boolean;
}) => {
  const [time, setTime] = useState<number>(props.maxTime);
  const refCircle = useRef<SVGCircleElement>(null);
  const conf = useContext(DebateContext).conf;

  const timeprotsound = ((temp) => ({
    element: temp[0],
    state: temp[1],
    controls: temp[2],
  }))(useAudio({ src: conf.soundPack.pingProtectedTime }));

  const endtalksound = ((temp) => ({
    element: temp[0],
    state: temp[1],
    controls: temp[2],
  }))(useAudio({ src: conf.soundPack.pingSpeechEnd }));

  const timeLeft = useLang("timeleft");
  const overtime = useLang("overtime");

  const delayInMs = 1000;
  const clockColorsTransitionDuration = "350ms"
  const fullvolume = 1; // useAudio volume range is 0-1

  useEffect(() => {
    timeprotsound.controls.volume(conf.soundPack.volumeOverride || fullvolume);
    endtalksound.controls.volume(conf.soundPack.volumeOverride || fullvolume);
    if (props.beepSpeechEnd && time === 0) endtalksound.controls.play();
    // prettier-ignore
    if(props.beepProtected && props.protectedTime && time === props.protectedTime) timeprotsound.controls.play();
    // prettier-ignore
    if(props.beepProtected && props.protectedTime && props.protectStart && time === props.maxTime - props.protectedTime) timeprotsound.controls.play();
  }, [time]);

  useEffect(() => setTime(props.maxTime), [props.running, props.maxTime]);
  useInterval(() => setTime(time - 1), props.running ? delayInMs : null);
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
          {time > 0 ? timeLeft : overtime}
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
                118 * 2 * Math.PI - (time / props.maxTime) * (118 * 2 * Math.PI)
              }
              strokeDasharray={refCircle.current?.getTotalLength()}
              style={{ transitionDuration: "350ms" }}
            />
          </svg>
        </div>
        {/* OUTER RING - GRAY STATIC RING UNDERNEATH GREEN */}
        <div className="absolute w-full h-full flex justify-center items-center">
          <svg
            className={`z-10 -rotate-90 ${
              time === props.maxTime
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
                  ? { transitionDuration: clockColorsTransitionDuration }
                  : {}
              }
            />
          </svg>
        </div>
        {props.clockImage != "null" && <ClockDisplayImage />}
        {timeprotsound.element}
        {endtalksound.element}
      </div>
    </>
  );
};

export { Clock };
