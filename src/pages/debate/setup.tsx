import { useContext } from "react";
import { OneContext } from "../_app";
import { defaultDebate } from "../_app";
import { DebateSetting } from "@/components/DebateSetting";
import Link from "next/link";
import { useLang } from "@/lib/useLang";

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
          {useLang("RESET_DEBATE_SETTINGS")}
        </button>
        <Link href="/debate">
          <button>{useLang("CONDUCT_DEBATE")}</button>
        </Link>
      </div>
    </>
  );
}
