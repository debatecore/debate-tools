import { OneContext } from "@/pages/_app";
import { useContext, useEffect, useState } from "react";
import useInterval from "react-useinterval";
import styles from "../styles/Clock.module.scss";
import { useLang } from "@/lib/useLang";

const DebateClock = (props: {
  running: boolean;
  stage: number;
  dimmed?: boolean;
}) => {
  const config = useContext(OneContext);
  const [time, setTime] = useState<number>(config?.debate.speechTime || 0);
  useInterval(() => {
    if (props.running) setTime(time - 1);
  }, 1000);
  useEffect(() => {
    setTime(config?.debate.speechTime || 0);
  }, [props.stage, config]);
  return (
    <>
      {/* <div style={{ padding: "32px 0" }}>
        {time} / {debate?.data.speechTime}
        {" seconds"}
      </div> */}
      <div
        className={`${styles.clockparent} ${props.dimmed ? styles.dimmed : ""}`}
      >
        <svg
          className={`
            ${styles.topCircle}
            ${time <= 10 ? styles.protectedtime : ""}
            ${time < 0 ? styles.overtime : ""}
            ${
              /* prettier-ignore */
              (
                (config?.debate.speechTime || 0) - (config?.debate.protectedTime || 0) <= time
                || time <= (config?.debate.protectedTime || 0)
              )&& props.running && config?.debate.protectedTime
                ? styles.protectedtime
                : ""
            }
          `}
          height="240"
          width="240"
        >
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeDashoffset={
              110 * 2 * Math.PI -
              (time / (config?.debate.speechTime || 240)) * (110 * 2 * Math.PI)
            }
            strokeWidth="5"
            r="110"
            cx="120"
            cy="120"
          />
        </svg>
        <svg
          className={`
            ${styles.bottomCircle}
            ${time <= 10 ? styles.nearovertime : ""}
            ${time <= 0 ? styles.overtime : ""}
          `}
          height="240"
          width="240"
        >
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth="5"
            r="110"
            cx="120"
            cy="120"
          />
        </svg>
        <main>
          {time > 0 ? (
            <h4>
              {Math.floor(time / 60) < 10 ? "0" : ""}
              {Math.floor(time / 60)}
              {":"}
              {Math.floor(time % 60) < 10 && Math.floor(time % 60) !== 0
                ? "0"
                : ""}
              {Math.floor(time % 60)}
              {Math.floor(time % 60) === 0 ? "0" : ""}
            </h4>
          ) : (
            <h4>{Math.abs(time)}</h4>
          )}
          <p className="mutedtext">
            {time > 0 ? useLang("TIME_LEFT") : useLang("SECONDS_OVERTIME")}
          </p>
        </main>
      </div>
    </>
  );
};

export { DebateClock };
