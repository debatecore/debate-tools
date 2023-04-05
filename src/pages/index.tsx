import { DebateSetting } from "@/components/DebateSetting";
import Link from "next/link";
import { useContext } from "react";
import { DebateContext } from "./_app";

export default function Home() {
  const debate = useContext(DebateContext);
  return (
    <>
      <div className="centerpadding">
        <h1>Oxford Debate Tools</h1>
        <p className="mutedtext">An aide to the marshall.</p>
      </div>
      <div className="centerpadding gap8">
        <DebateSetting type="motion" />
        <DebateSetting type="proTeam" />
        <DebateSetting type="oppTeam" />
        <DebateSetting type="speechTime" numberIsSeconds />
        <DebateSetting type="protectedTime" numberIsSeconds />
      </div>
      <div className="centerpadding gap8">
        <Link href="/debate">
          <button
            style={{
              padding: "6px 12px",
              borderRadius: "1000px",
            }}
          >
            conduct the debate
          </button>
        </Link>
      </div>
    </>
  );
}
