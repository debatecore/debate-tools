import { DebateClock } from "@/components/DebateClock";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/Debate.module.scss";
import { DebateContext } from "./_app";

function PageDebate() {
  const debate = useContext(DebateContext);
  const [running, setRunning] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);
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
        <section
          className="mutedtext"
          style={{
            textTransform: "uppercase",
          }}
        >
          <p>
            {Math.floor(stage / 2 + 1) != 5 ? (
              <span>
                {Math.floor(stage / 2 + 1)}
                {Math.floor(stage / 2 + 1) == 1
                  ? "st"
                  : Math.floor(stage / 2 + 1) == 2
                  ? "nd"
                  : Math.floor(stage / 2 + 1) == 3
                  ? "rd"
                  : "th"}{" "}
                {"speaker of the"}{" "}
                {stage % 2 == 0 ? "Proposition" : "Opposition"} {"side"}
              </span>
            ) : (
              <span>competition complete!</span>
            )}
          </p>
        </section>
        <section className={`${styles.sideitems}`}>
          <DebateClock
            running={running && [0, 2, 4, 6].includes(stage)}
            dimmed={running && [1, 3, 5, 7].includes(stage)}
            stage={stage}
          />
          <DebateClock
            running={running && [1, 3, 5, 7].includes(stage)}
            dimmed={running && [0, 2, 4, 6].includes(stage)}
            stage={stage}
          />
        </section>
        <button
          style={{
            background: "#282828",
            padding: "6px 12px",
            borderRadius: "6px",
          }}
          onClick={() => {
            if (stage < 8) {
              if (running) {
                setRunning(false);
                setStage(stage + 1);
              } else {
                setRunning(true);
              }
            }
          }}
        >
          {stage == 0 && !running
            ? "Start Proposition's First Speech"
            : stage == 0 && running
            ? "End Proposition's First Speech"
            : stage == 1 && !running
            ? "Start Opposition's First Speech"
            : stage == 1 && running
            ? "End Opposition's First Speech"
            : stage == 2 && !running
            ? "Start Proposition's Second Speech"
            : stage == 2 && running
            ? "End Proposition's Second Speech"
            : stage == 3 && !running
            ? "Start Opposition's Second Speech"
            : stage == 3 && running
            ? "End Opposition's Second Speech"
            : stage == 4 && !running
            ? "Start Proposition's Third Speech"
            : stage == 4 && running
            ? "End Proposition's Third Speech"
            : stage == 5 && !running
            ? "Start Opposition's Third Speech"
            : stage == 5 && running
            ? "End Opposition's Third Speech"
            : stage == 6 && !running
            ? "Start Proposition's Fourth Speech"
            : stage == 6 && running
            ? "End Proposition's Fourth Speech"
            : stage == 7 && !running
            ? "Start Opposition's Fourth Speech"
            : stage == 7 && running
            ? "End Opposition's Fourth Speech"
            : "Competition complete :)"}
        </button>
      </main>
    </>
  );
}

export default PageDebate;
