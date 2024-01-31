"use client";
import { IconBell } from "@/components/icons/Bell";
import { useLang } from "@/lib/useLang";
import { iconprops } from "@/types/iconprops";

export default function SoundTestPage() {
  return (
    <div>
      <h1 className="text-3xl mt-8 text-center font-serif">
        {useLang("soundDemonstration")}
      </h1>
      <p className="mb-8 text-center text-neutral-500">
        {useLang("soundDemonstrationSubtitle")}
      </p>
      <div className="max-w-4xl mx-auto">
        <p className="text-neutral-500 text-center text-balance">
          {useLang("soundDemonstrationSingleDoubleExpl")}
        </p>
        <div className="flex flex-row justify-center items-center gap-2 m-4">
          {[
            {
              title: "Single ping",
              sound: "ping.mp3",
              righticon: IconBell,
              // lefticon: IconAlertTriangle,
            },
            {
              title: "Double ping",
              sound: "ping2.mp3",
              righticon: IconBell,
              // lefticon: IconClock,
            },
          ].map(
            (el: {
              title: string;
              sound: string;
              righticon?: (props: iconprops) => JSX.Element;
              lefticon?: (props: iconprops) => JSX.Element;
            }) => {
              return (
                <button
                  key={el.title}
                  onClick={() => {
                    console.log(`${el.sound} played.`);
                  }}
                  className="relative p-4 w-1/3 rounded border-2 border-neutral-800 bg-neutral-800 hover:border-neutral-700 overflow-hidden"
                >
                  {el.title}
                  {el.righticon
                    ? el.righticon({
                        moreClass:
                          "absolute rotate-[-30deg] top-1 right-3 text-neutral-700 scale-[3]",
                      })
                    : ""}
                  {el.lefticon
                    ? el.lefticon({
                        moreClass:
                          "absolute rotate-[0deg] bottom-1 left-1 text-neutral-700 scale-[2.5]",
                        // "absolute rotate-[0deg] bottom-4 left-4 text-neutral-700 scale-[2]",
                      })
                    : ""}
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
