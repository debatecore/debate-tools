import { IconHeart } from "@/components/icons/Heart";
import { useLang } from "@/lib/useLang";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col text-center mt-16 mb-8">
          <h1 className="text-4xl font-serif">Debate Tools</h1>
          <p className="text-neutral-500 flex flex-row justify-center gap-[2px] select-none">
            {"Made with"}
            <IconHeart moreClass="scale-75" />
            {"in Poznań by fellow debaters."}
          </p>
        </div>
        <div className="flex flex-col w-fit mx-auto gap-2">
          <div className="flex flex-row justify-between text-neutral-500">
            <p>Language</p>
            <select className="bg-transparent">
              <option value="en">🇬🇧 English</option>
              <option value="pl">🇵🇱 polski</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="jp">🇯🇵 日本語</option>
            </select>
          </div>
          {[
            {
              dest: "/oxford-debate/setup",
              name: "Oxford Debate Utility",
            },
            {
              dest: "/sound-demonstration",
              name: "Sound Demonstration",
              disabled: true,
            },
            {
              dest: "/debate-motion-generator",
              name: "Debate Motion Generator",
              disabled: true,
            },
            {
              dest: "/ladder-generator",
              name: "Tournament Ladder Generator",
              disabled: true,
            },
            // {
            //   dest: "/about",
            //   name: "About the site",
            //   // disabled: true,
            // },
          ].map((el) => {
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
                      ml-auto p-2 px-6 rounded-lg w-full border-2
                      border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {el.name}
                  </button>
                </Link>
              </div>
            );
          })}
          <div className="flex flex-row justify-between text-neutral-500">
            {/* {useLang("byPoznanDebaters")} */}
          </div>
        </div>
      </div>
      <div className="hidden lg:block max-w-7xl mx-auto mt-auto text-neutral-800 text-center p-2">
        <p className="text-balance">
          Originally made for the purposes of the debaters from ZSK Poznań as
          well as various Polish debate organisations. Available freely. &copy;
          2023-2024 Jakub Mańczak.
        </p>
      </div>
    </div>
  );
}
