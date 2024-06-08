"use client";

import { DebateContext } from "@/contexts/DebateContext";
import { useLang } from "@/lib/useLang";
import Image from "next/image";
import { useContext, useState } from "react";

const ClockDisplayImage = ({}) => {
  const currentDebateConf = useContext(DebateContext).conf;
  const clockImageName = currentDebateConf.clockImageName;
  const [clockImageLoaded, setClockImageLoaded] = useState(false);

  return (
    <span className="absolute w-full h-full flex justify-center items-center">
      {!clockImageLoaded && (
        <div className="w-15 h-15 pt-32">{useLang("loading")}</div>
      )}
      {clockImageName === "MOW2018" && (
        <Image
          src={"/displayimages/Musketeer.png"}
          alt="Musketeers of Words logo"
          width={80}
          height={64}
          className="mt-32"
          onLoad={() => setClockImageLoaded(true)}
        />
      )}
      {clockImageName === "MOW2024" && (
        <Image
          src={"/displayimages/MOW.png"}
          alt="Musketeers of Words logo"
          width={60}
          height={60}
          className="mt-36 rounded-full"
          onLoad={() => setClockImageLoaded(true)}
        />
      )}
      {clockImageName === "custom" &&
        currentDebateConf.customClockImageBase64 != "" && (
          <Image
            src={`data:image/png;base64, ${currentDebateConf.customClockImageBase64}`}
            alt="Custom logo"
            width={60}
            height={60}
            className="mt-36"
            onLoad={() => setClockImageLoaded(true)}
          />
        )}
    </span>
  );
};

export { ClockDisplayImage };
