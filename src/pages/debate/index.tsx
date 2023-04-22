import { DebateClock } from "@/components/DebateClock";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/Debate.module.scss";
import { OneContext } from "../_app";
import { useLang } from "@/lib/useLang";
import Link from "next/link";

function PageDebate() {
  const config = useContext(OneContext);
  const [running, setRunning] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);
  return (
    <>
      <main className={`centertext ${styles.debateMain}`}>
        <h1>{config?.debate.motion || "debatemotion"}</h1>
        <p className="mutedtext">{useLang("AN_OXFORD_FORMAT_DEBATE")}</p>
        <section
          className={`${styles.sideitems} ${styles.topPadding48} ${styles["innerPadding0-48"]}`}
        >
          <h2>{config?.debate.proTeam || "Anonymous"}</h2>
          <h2>{config?.debate.oppTeam || "Anonymous"}</h2>
        </section>
        <section
          className={`mutedtext ${styles.sideitems} ${styles["innerPadding0-48"]}`}
        >
          <p>{config?.debate.proTeam ? useLang("AS_PROPO") : "-"}</p>
          <p>{config?.debate.oppTeam ? useLang("AS_OPPO") : "-"}</p>
        </section>
        <section className={styles.sideitems}>
          <section className={styles.dotsSection}>
            <div
              className={`${styles.dotGeneric} ${
                stage > 0 ? styles.dotFilled : ""
              }`}
            />
            <div
              className={`${styles.dotGeneric} ${
                stage > 2 ? styles.dotFilled : ""
              }`}
            />
            <div
              className={`${styles.dotGeneric} ${
                stage > 4 ? styles.dotFilled : ""
              }`}
            />
            <div
              className={`${styles.dotGeneric} ${
                stage > 6 ? styles.dotFilled : ""
              }`}
            />
          </section>
          <section className={styles.dotsSection}>
            <div
              className={`${styles.dotGeneric} ${
                stage > 1 ? styles.dotFilled : ""
              }`}
            />
            <div
              className={`${styles.dotGeneric} ${
                stage > 3 ? styles.dotFilled : ""
              }`}
            />
            <div
              className={`${styles.dotGeneric} ${
                stage > 5 ? styles.dotFilled : ""
              }`}
            />
            <div
              className={`${styles.dotGeneric} ${
                stage > 7 ? styles.dotFilled : ""
              }`}
            />
          </section>
        </section>
        <section className="mutedtext">
          <p>
            {stage == 0
              ? useLang("STAGE_0")
              : stage == 1
              ? useLang("STAGE_1")
              : stage == 2
              ? useLang("STAGE_2")
              : stage == 3
              ? useLang("STAGE_3")
              : stage == 4
              ? useLang("STAGE_4")
              : stage == 5
              ? useLang("STAGE_5")
              : stage == 6
              ? useLang("STAGE_6")
              : stage == 7
              ? useLang("STAGE_7")
              : useLang("STAGE_8")}
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
        {stage < 8 ? (
          <button
            onClick={() => {
              if (stage >= 8) return;
              if (running) {
                setRunning(false);
                setStage(stage + 1);
              } else {
                setRunning(true);
              }
            }}
          >
            {stage == 0 && !running
              ? useLang("STAGE_0_0_BTN")
              : stage == 0 && running
              ? useLang("STAGE_0_1_BTN")
              : stage == 1 && !running
              ? useLang("STAGE_1_0_BTN")
              : stage == 1 && running
              ? useLang("STAGE_1_1_BTN")
              : stage == 2 && !running
              ? useLang("STAGE_2_0_BTN")
              : stage == 2 && running
              ? useLang("STAGE_2_1_BTN")
              : stage == 3 && !running
              ? useLang("STAGE_3_0_BTN")
              : stage == 3 && running
              ? useLang("STAGE_3_1_BTN")
              : stage == 4 && !running
              ? useLang("STAGE_4_0_BTN")
              : stage == 4 && running
              ? useLang("STAGE_4_1_BTN")
              : stage == 5 && !running
              ? useLang("STAGE_5_0_BTN")
              : stage == 5 && running
              ? useLang("STAGE_5_1_BTN")
              : stage == 6 && !running
              ? useLang("STAGE_6_0_BTN")
              : stage == 6 && running
              ? useLang("STAGE_6_1_BTN")
              : stage == 7 && !running
              ? useLang("STAGE_7_0_BTN")
              : useLang("STAGE_7_1_BTN")}
          </button>
        ) : (
          <Link href="/debate/setup">
            <button>{useLang("STAGE_8_BTN")}</button>
          </Link>
        )}
      </main>
    </>
  );
}

export default PageDebate;
