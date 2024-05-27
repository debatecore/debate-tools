"use client";
import { LangSwitchComponent } from "@/components/LangSwitch";
import { LinkButton, LinkButtonProps } from "@/components/LinkButton";
import { IconBell } from "@/components/icons/Bell";
import { IconClipboard } from "@/components/icons/Clipboard";
import { IconClock } from "@/components/icons/Clock";
import { IconFileText } from "@/components/icons/FileText";
import { IconHeart } from "@/components/icons/Heart";
import { useLang } from "@/lib/useLang";

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
              href: "/oxford-debate/setup",
              text: useLang("oxfordDebateConductionUtility"),
              icon: IconClock,
            },
            {
              href: "/sound-demonstration",
              text: useLang("soundDemonstration"),
              icon: IconBell,
            },
            {
              href: "/debate-motion-generator",
              text: useLang("debateMotionGenerator"),
              icon: IconFileText,
            },
            {
              href: "/tournament-planner",
              text: useLang("tournamentPlanner"),
              disabled: true,
              icon: IconClipboard,
            },
          ].map((el: LinkButtonProps) => {
            return <LinkButton {...el} key={el.href} />;
          })}
        </div>
      </div>
      <div className="hidden lg:block max-w-7xl mx-auto mt-auto text-neutral-600 text-center p-2">
        <p className="text-balance">
          {useLang("disclaimer")}
          {" © 2023-2024 Jakub Mańczak."}
        </p>
      </div>
    </div>
  );
}
