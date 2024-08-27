import { useLang } from "@/lib/useLang";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

type footerlink = {
  text: string;
  href: string;
};

const DebatecoreFooter = (props: {}) => {
  const boldfont = lexend.className;

  const footerlinks: footerlink[] = [
    {
      text: useLang("footerAbout"),
      href: "https://debateco.re/about",
    },
    {
      text: `${useLang("footerLicense")} (AGPLv3)`,
      href: "https://github.com/debatecore/debate-tools/blob/master/LICENSE",
    },
    {
      text: useLang("footerSourceCode"),
      href: "https://github.com/debatecore/debate-tools",
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-2 mx-auto">
        <div>
          <a
            href="https://debateco.re"
            className={`${boldfont} tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-400 from-30% to-70%`}
          >
            debatecore
          </a>
        </div>
        <div className="w-1 h-1 hidden md:block bg-neutral-500 rounded" />
        <div className="flex flex-row flex-wrap justify-center items-center gap-4">
          {footerlinks.map((link) => {
            return (
              <a
                href={link.href}
                key={link.text}
                className="text-neutral-400 hover:underline"
              >
                {link.text}
              </a>
            );
          })}
        </div>
      </div>
      <div className="mx-auto p-2 text-balance text-center text-neutral-700">
        {useLang("disclaimer")}
        {" © 2023-2024 Jakub Mańczak & Mateusz Dobrzyński"}
      </div>
    </>
  );
};

export { DebatecoreFooter };
