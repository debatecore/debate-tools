import { DebateContext } from "@/pages/_app";
import { useContext, useEffect, useState } from "react";
import useInterval from "react-useinterval";

const DebateClock = (props: { running: boolean; stage: number }) => {
  const debate = useContext(DebateContext);
  const [time, setTime] = useState<number>(debate?.data.speechTime || 0);
  useInterval(() => {
    if (props.running) setTime(time - 1);
  }, 1000);
  useEffect(() => {
    setTime(debate?.data.speechTime || 0);
  }, [props.stage]);
  return (
    <>
      <div style={{ padding: "32px 0" }}>
        {time} / {debate?.data.speechTime}
        {" seconds"}
      </div>
    </>
  );
};

export { DebateClock };
