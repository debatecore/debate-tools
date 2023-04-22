import { useContext } from "react";
import { OneContext } from "../_app";
import { defaultDebate } from "../_app";
import { DebateSetting } from "@/components/DebateSetting";
import Link from "next/link";

export default function PageDebateSetup() {
  const config = useContext(OneContext);
  return (
    <>
      <div className="centerpadding gap8">
        <DebateSetting setting="motion" />
        <DebateSetting setting="proTeam" />
        <DebateSetting setting="oppTeam" />
        <DebateSetting setting="speechTime" numberIsSeconds />
        <DebateSetting setting="protectedTime" numberIsSeconds />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          maxWidth: "600px",
          margin: "0 auto",
          gap: "12px",
        }}
      >
        <button
          onClick={() => {
            config?.setDebate(defaultDebate);
          }}
        >
          {"reset debate settings"}
        </button>
        <Link href="/debate">
          <button>{"conduct the debate"}</button>
        </Link>
      </div>
    </>
  );
}
