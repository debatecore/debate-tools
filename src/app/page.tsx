"use client";
import { LangSwitchComponent } from "@/components/LangSwitch";
import { IconBell } from "@/components/icons/Bell";
import { IconClipboard } from "@/components/icons/Clipboard";
import { IconClock } from "@/components/icons/Clock";
import { IconFileText } from "@/components/icons/FileText";
import { IconHeart } from "@/components/icons/Heart";
import { useLang } from "@/lib/useLang";
import { iconprops } from "@/types/iconprops";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col text-center mt-16 mb-8">
          <h1 className="text-4xl font-serif">{useLang("debateTools")}</h1>
          <p className="text-neutral-500 flex flex-row flex-wrap justify-center gap-[2px] select-none">
            {useLang("madeWith")}
            <IconHeart moreClass="scale-75" />
            {useLang("byPoznanDebaters")}
          </p>
        </div>
        <div className="flex flex-col w-fit mx-auto gap-2">
          <LangSwitchComponent />
          {[
            {
              dest: "/oxford-debate/setup",
              name: useLang("oxfordDebateConductionUtility"),
              icon: IconClock,
            },
            {
              dest: "/sound-demonstration",
              name: useLang("soundDemonstration"),
              icon: IconBell,
            },
            {
              dest: "/debate-motion-generator",
              name: useLang("debateMotionGenerator"),
              disabled: true,
              icon: IconFileText,
            },
            {
              dest: "/tournament-planner",
              name: useLang("tournamentPlanner"),
              disabled: true,
              icon: IconClipboard,
            },
          ].map(
            (el: {
              dest: string;
              name: string;
              disabled?: boolean;
              icon?: (props: iconprops) => JSX.Element;
            }) => {
              return (
                <div key={el.dest}>
                  <Link
                    href={el.disabled ? "/" : el.dest}
                    className="rounded-lg"
                    tabIndex={el.disabled ? -1 : 0}
                  >
                    <button
                      disabled={el.disabled}
                      tabIndex={-1}
                      className={`
                      ml-auto p-2 px-12 rounded-lg w-full border-2 relative overflow-hidden
                      border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                    >
                      <div className="z-20">{el.name}</div>
                      {el.icon
                        ? el.icon({
                            moreClass:
                              "absolute bottom-1 right-0 scale-[1.75] rotate-[-15deg] opacity-[.15] text-white z-10",
                          })
                        : ""}
                    </button>
                  </Link>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="hidden lg:block max-w-7xl mx-auto mt-auto text-neutral-800 text-center p-2">
        <p className="text-balance">
          {useLang("disclaimer")}
          {" © 2023-2024 Jakub Mańczak."}
        </p>
      </div>
    </div>
  );
}
