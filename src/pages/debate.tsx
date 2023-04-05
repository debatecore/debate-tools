import { useContext, useEffect, useState } from "react";
import styles from "../styles/Debate.module.scss";
import { DebateContext } from "./_app";

function PageDebate() {
  const debate = useContext(DebateContext);
  const proClock = useState<number>(debate?.data.speechTime || 0);
  const oppClock = useState<number>(debate?.data.speechTime || 0);
  return (
    <>
      <main className={`centertext ${styles.debateMain}`}>
        <h1>{debate?.data.motion || "debatemotion"}</h1>
        <p className="mutedtext">
          {debate?.data.format == "oxford" ? "AN OXFORD FORMAT DEBATE" : ""}
        </p>
        <section
          className={`${styles.sideitems} ${styles.topPadding48} ${styles["innerPadding0-48"]}`}
        >
          <h2>{debate?.data.proTeam || "The Proposition"}</h2>
          <h2>{debate?.data.oppTeam || "The Opposition"}</h2>
        </section>
        <section
          className={`mutedtext ${styles.sideitems} ${styles["innerPadding0-48"]}`}
        >
          <p>{debate?.data.proTeam ? "AS THE PROPOSITION" : "-"}</p>
          <p>{debate?.data.oppTeam ? "AS THE OPPOSITION" : "-"}</p>
        </section>
        {/* <section className={`${styles.sideitems}`}></section> */}
      </main>
    </>
  );
}

export default PageDebate;
