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
  const subProposition = useLang("AS_PROPO");
  const subOpposition = useLang("AS_OPPO");
  const stageText = useLang(
    stage == 0
      ? "STAGE_0"
      : stage == 1
      ? "STAGE_1"
      : stage == 2
      ? "STAGE_2"
      : stage == 3
      ? "STAGE_3"
      : stage == 4
      ? "STAGE_4"
      : stage == 5
      ? "STAGE_5"
      : stage == 6
      ? "STAGE_6"
      : stage == 7
      ? "STAGE_7"
      : "STAGE_8"
  );
  const stageBtnText = useLang(
    stage == 0 && !running
      ? "STAGE_0_0_BTN"
      : stage == 0 && running
      ? "STAGE_0_1_BTN"
      : stage == 1 && !running
      ? "STAGE_1_0_BTN"
      : stage == 1 && running
      ? "STAGE_1_1_BTN"
      : stage == 2 && !running
      ? "STAGE_2_0_BTN"
      : stage == 2 && running
      ? "STAGE_2_1_BTN"
      : stage == 3 && !running
      ? "STAGE_3_0_BTN"
      : stage == 3 && running
      ? "STAGE_3_1_BTN"
      : stage == 4 && !running
      ? "STAGE_4_0_BTN"
      : stage == 4 && running
      ? "STAGE_4_1_BTN"
      : stage == 5 && !running
      ? "STAGE_5_0_BTN"
      : stage == 5 && running
      ? "STAGE_5_1_BTN"
      : stage == 6 && !running
      ? "STAGE_6_0_BTN"
      : stage == 6 && running
      ? "STAGE_6_1_BTN"
      : stage == 7 && !running
      ? "STAGE_7_0_BTN"
      : stage == 7 && running
      ? "STAGE_7_1_BTN"
      : "STAGE_8_BTN"
  );
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
          <p>{config?.debate.proTeam ? subProposition : "-"}</p>
          <p>{config?.debate.oppTeam ? subOpposition : "-"}</p>
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
          <p>{stageText}</p>
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
        <Link href={stage >= 8 ? "/debate/setup" : ""}>
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
            {stageBtnText}
          </button>
        </Link>
      </main>
    </>
  );
}

export default PageDebate;
