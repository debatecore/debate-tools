import { DebateContext } from "@/pages/_app";
import { useContext, useEffect, useState } from "react";
import useInterval from "react-useinterval";
import styles from "../styles/Clock.module.scss";

const DebateClock = (props: { running: boolean; stage: number }) => {
  const debate = useContext(DebateContext);
  const [time, setTime] = useState<number>(debate?.data.speechTime || 0);
  useInterval(() => {
    if (props.running) setTime(time - 1);
  }, 1000);
  useEffect(() => {
    setTime(debate?.data.speechTime || 0);
  }, [props.stage, debate]);
  return (
    <>
      {/* <div style={{ padding: "32px 0" }}>
        {time} / {debate?.data.speechTime}
        {" seconds"}
      </div> */}
      <div className={styles.clockparent}>
        <svg
          className={`${styles.topCircle} ${
            time <= 10 ? styles.nearovertime : ""
          } ${time < 0 ? styles.overtime : ""}`}
          height="240"
          width="240"
        >
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeDashoffset={
              110 * 2 * Math.PI -
              (time / (debate?.data.speechTime || 240)) * (110 * 2 * Math.PI)
            }
            strokeWidth="5"
            r="110"
            cx="120"
            cy="120"
          />
        </svg>
        <svg
          className={`${styles.bottomCircle} ${
            time <= 10 ? styles.nearovertime : ""
          }`}
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
            {time > 0 ? "TIME LEFT" : "SECONDS OF OVERTIME"}
          </p>
        </main>
      </div>
    </>
  );
};

export { DebateClock };
