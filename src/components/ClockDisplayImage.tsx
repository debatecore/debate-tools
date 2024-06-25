"use client";
import { DebateContext } from "@/contexts/DebateContext";
import { useLang } from "@/lib/useLang";
import Image from "next/image";
import { useContext, useState } from "react";

const ClockDisplayImage = () => {
  const currentDebateConf = useContext(DebateContext).conf;
  const clockImageName = currentDebateConf.clockImageName;

  const [clockImageLoaded, setClockImageLoaded] = useState(false);
  const loadingText = useLang("loading");

  return (
    <span className="absolute w-full h-full flex justify-center items-center">
      {!clockImageLoaded && (
        <div className="w-15 h-15 pt-32">{loadingText}</div>
      )}
      {clockImageName === "MOW2018" && (
        <Image
          src={"/display-images/MOW2018.png"}
          alt="Musketeers of Words logo (2018-2023)"
          width={80}
          height={64}
          className="mt-32"
          onLoad={() => setClockImageLoaded(true)}
          hidden={!clockImageLoaded}
        />
      )}
      {clockImageName === "MOW2024" && (
        <Image
          src={"/display-images/MOW2024.png"}
          alt="Musketeers of Words logo (since 2024)"
          width={60}
          height={60}
          className="mt-36 rounded-full"
          onLoad={() => setClockImageLoaded(true)}
          hidden={!clockImageLoaded}
        />
      )}
      {clockImageName === "PND2024" && (
        <Image
          src={"/display-images/PND2024.png"}
          alt="Poznańska Noc Debaty logo (since 2024)"
          width={100}
          height={100}
          className="mt-40"
          onLoad={() => setClockImageLoaded(true)}
          hidden={!clockImageLoaded}
        />
      )}
      {clockImageName === "ZSK" && (
        <Image
          src={"/display-images/ZSK.webp"}
          alt="Zespół Szkół Komunikacji logo"
          width={64}
          height={64}
          className="mt-36"
          onLoad={() => setClockImageLoaded(true)}
          hidden={!clockImageLoaded}
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
            hidden={!clockImageLoaded}
          />
        )}
    </span>
  );
};

export { ClockDisplayImage };
