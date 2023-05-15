import { DebateContext } from "@/contexts/DebateContext";
import { useLang } from "@/lib/useLang";
import { useContext, useEffect, useRef, useState } from "react";
import { useInterval } from "react-use";

const DebateClock = (props: {
  running: boolean;
  stage: number;
  dimmed?: boolean;
}) => {
  const debate = useContext(DebateContext);
  const [time, setTime] = useState<number>(debate?.data.speechTime || 0);
  const refCircle = useRef<SVGCircleElement>(null);
  const delay = 1000; // ms
  useEffect(() => {
    setTime(debate?.data.speechTime || 0);
  }, [props.stage, debate]);
  useInterval(
    () => {
      setTime(time - 1);
    },
    props.running ? delay : null
  );
  const underclock = useLang(
    time >= 0
      ? "timeLeft"
      : time === -1
      ? "secondsOverTime_1"
      : [-2, -3, -4].includes(time)
      ? "secondsOverTime_2-3-4"
      : "secondsOverTime"
  );
  return (
    <>
      <div
        className={`
					flex flex-col justify-center items-center h-64 w-64 relative
					${props.dimmed ? "opacity-40" : ""}
				`}
        style={{
          transitionDuration: "350ms",
        }}
      >
        <h2 className="text-5xl">
          {time >= 0 ? (
            <>
              {Math.floor(time / 60) < 10 ? "0" : ""}
              {Math.floor(time / 60)}
              {":"}
              {Math.floor(time % 60) < 10 && Math.floor(time % 60) !== 0
                ? "0"
                : ""}
              {Math.floor(time % 60)}
              {Math.floor(time % 60) === 0 ? "0" : ""}
            </>
          ) : (
            <>{Math.abs(time)}</>
          )}
        </h2>
        <p className="text-zinc-500 pt-1">{underclock}</p>
        <svg
          width="256"
          height="256"
          className={`
						absolute top-0 left-0 w-64 h-64 -rotate-90 z-20 text-emerald-400
						${time <= (debate?.data.speechTime || 240) / 12 ? "text-orange-400" : ""}
            ${
              debate?.data.protectedTime &&
              props.running &&
              time >= debate.data.speechTime - debate.data.protectedTime
                ? "text-orange-400"
                : ""
            }
            ${
              debate?.data.protectedTime && time <= debate.data.protectedTime
                ? "text-orange-400"
                : ""
            }
            ${time <= 5 ? "!text-rose-400" : ""}
					`}
        >
          <circle
            ref={refCircle}
            stroke="currentColor"
            fill="transparent"
            r="118"
            cx="128"
            cy="128"
            strokeWidth={5}
            strokeDashoffset={
              118 * 2 * Math.PI -
              (time / (debate?.data.speechTime || 240)) * (118 * 2 * Math.PI)
            }
            strokeDasharray={
              refCircle.current?.getTotalLength()
              // refCircle.current?.getTotalLength() || 741.1163330078125
            }
            style={{ transitionDuration: "350ms" }}
          />
        </svg>
        <svg
          width="256"
          height="256"
          className={`
						absolute top-0 left-0 w-64 h-64 text-zinc-700 z-10
						${time <= 0 ? "!text-rose-400" : ""}
					`}
        >
          <circle
            stroke="currentColor"
            fill="transparent"
            r="118"
            cx="128"
            cy="128"
            strokeWidth={5}
            style={{ transitionDuration: "350ms" }}
          />
        </svg>
      </div>
    </>
  );
};
export { DebateClock };
