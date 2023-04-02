import { useEffect, useState } from "react";
import styles from "../styles/oxford.module.scss";

function Oxford() {
  const [motion, setMotion] = useState("");
  const motionPlaceholder = "This is the debate's motion.";
  // set working data for development
  useEffect(() => {
    setMotion("This House would abolish the UN Security Council.");
  }, []);
  return (
    <>
      <h1>{motion || motionPlaceholder}</h1>
      <p className="mutedtext">{"AN OXFORD FORMAT DEBATE"}</p>
    </>
  );
}

export default Oxford;
