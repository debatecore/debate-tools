"use client";
import { DebateConfStringsPanel } from "@/components/DebateConfStringsPanel";
import { GenericButton } from "@/components/GenericButton";
import { GenericSelect } from "@/components/GenericSelect";
import { LinkButton } from "@/components/LinkButton";
import { TimeInput } from "@/components/TimeInput";
import { IconCheck } from "@/components/icons/Check";
import { IconList } from "@/components/icons/List";
import { IconPlayCircle } from "@/components/icons/PlayCircle";
import { IconX } from "@/components/icons/X";
import { DebateContext } from "@/contexts/DebateContext";
import { useLang } from "@/lib/useLang";
import { displayImageType, displayImageTypeArray } from "@/types/debate";
import { useContext, useEffect, useState } from "react";
import {
  defaultSoundPack,
  soundPackName,
  soundPackNamesArray,
  soundPacks,
} from "@/types/soundPack";
import { convertImageToBase64 } from "@/lib/imageToBase64";

export default function OxfordDebateSetup() {
  const debateContext = useContext(DebateContext);
  const flavorText = useLang("oxfordDebateConfigurationFlavorText");
  const clockImageSelect = useLang("clockImage");
  const clockImageNull = useLang("clockImageNullOption");
  const clockImageCustom = useLang("clockImageCustomOption");
  const soundPackSelect = useLang("soundPackSelect");
  const soundPackDefault = useLang("defaultSoundsOption");
  const [customClockImageSelected, setCustomClockImageSelected] =
    useState(false);

  const getDisplayNameOfClockImage = (clockImageName: string) => {
    switch (clockImageName) {
      case "null":
        return clockImageNull;
      case "custom":
        return clockImageCustom;
      default:
        return clockImageName;
    }
  };

  const setClockImage = (clockImageName: displayImageType) => {
    debateContext.setConf({
      ...debateContext.conf,
      clockImageName: clockImageName,
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    const input = e.target;
    if (!input.files) return;
    const file = input.files[0];
    const base64Image = await convertImageToBase64(file);
    debateContext.setConf({
      ...debateContext.conf,
      customClockImageBase64: base64Image,
    });
  };

  useEffect(() => {
    if (debateContext.conf.clockImageName == "custom") {
      setCustomClockImageSelected(true);
    } else {
      setCustomClockImageSelected(false);
    }
  });

  return (
    <div className="mb-5 lg:mb-0">
      <h1 className="text-3xl mt-8 text-center font-serif">
        {useLang("oxfordDebateConfiguration")}
      </h1>
      <p className="text-center text-neutral-500">
        {debateContext.conf.motion || flavorText}
      </p>
      <div className="max-w-2xl mx-auto mt-8 flex flex-col gap-6 lg:gap-4 px-4">
        <DebateConfStringsPanel />
        <hr className="border-b-2 rounded border-neutral-800 my-2" />
        <GenericSelect
          id="clockimageselect"
          text={clockImageSelect}
          value={getDisplayNameOfClockImage(debateContext.conf.clockImageName)}
          options={displayImageTypeArray.map((element) => {
            return {
              value: getDisplayNameOfClockImage(element),
              exec: () => setClockImage(element),
            };
          })}
        />
        <input
          type="file"
          id="clockImage"
          name="clockImage"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageChange}
          hidden={!customClockImageSelected}
        />
        <GenericSelect
          id="soundpackselect"
          text={soundPackSelect}
          value={
            debateContext.conf.soundPack.name === "default"
              ? soundPackDefault
              : debateContext.conf.soundPack.name
          }
          options={soundPackNamesArray.map((element: soundPackName) => {
            return {
              value: element === "default" ? soundPackDefault : element,
              exec: () => {
                const soundPack =
                  soundPacks.find((soundPack) => {
                    return soundPack.name == element;
                  }) || defaultSoundPack;
                debateContext.setConf({
                  ...debateContext.conf,
                  soundPack: soundPack,
                });
              },
            };
          })}
        />
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <p className="mb-2 lg:mb-0">{useLang("speechTime")}</p>
          <TimeInput
            time={debateContext.conf.speechTime}
            setTime={(time: number) => {
              debateContext.setConf({
                ...debateContext.conf,
                speechTime: time,
              });
            }}
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <p className="mb-2 lg:mb-0">{useLang("protectedTime")}</p>
          <TimeInput
            time={debateContext.conf.endProtectedTime}
            setTime={(time: number) => {
              debateContext.setConf({
                ...debateContext.conf,
                endProtectedTime: time,
              });
            }}
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <p className="mb-2 lg:mb-0">{useLang("adVocemTime")}</p>
          <TimeInput
            time={debateContext.conf.adVocemTime}
            setTime={(time: number) => {
              debateContext.setConf({
                ...debateContext.conf,
                adVocemTime: time,
              });
            }}
          />
        </div>
        <GenericButton
          text={useLang("beepOnSpeechEnd")}
          icon={debateContext.conf.beepOnSpeechEnd ? IconCheck : IconX}
          onClick={() => {
            debateContext.setConf({
              ...debateContext.conf,
              beepOnSpeechEnd: !debateContext.conf.beepOnSpeechEnd,
            });
          }}
        />
        <GenericButton
          text={useLang("beepOnProtected")}
          icon={debateContext.conf.beepProtectedTime ? IconCheck : IconX}
          onClick={() => {
            debateContext.setConf({
              ...debateContext.conf,
              beepProtectedTime: !debateContext.conf.beepProtectedTime,
            });
          }}
        />
        <GenericButton
          text={useLang("protectSpeechStart")}
          icon={debateContext.conf.startProtectedTime ? IconCheck : IconX}
          onClick={() => {
            debateContext.setConf({
              ...debateContext.conf,
              startProtectedTime:
                debateContext.conf.startProtectedTime === 0
                  ? debateContext.conf.endProtectedTime
                  : 0,
            });
          }}
        />
        <hr className="border-b-2 rounded border-neutral-800 my-2" />
        <div className="flex flex-row flex-wrap justify-center gap-2">
          <LinkButton href="/" text={useLang("mainMenu")} icon={IconList} />
          <LinkButton
            href="/oxford-debate"
            text={useLang("startDebate")}
            icon={IconPlayCircle}
          />
        </div>
      </div>
    </div>
  );
}
