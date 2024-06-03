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
import { HTMLAttributes, useContext } from "react";
import sharp from "sharp";
import {
  defaultSoundPack,
  soundPackName,
  soundPackNamesArray,
  soundPacks,
} from "@/types/soundPack";

export default function OxfordDebateSetup() {
  const debateContext = useContext(DebateContext);
  const flavortext = useLang("oxfordDebateConfigurationFlavortext");
  const brandingselect = useLang("brandingdisplayimage");
  const brandingNull = useLang("brandingdisplayimage_nulloption");
  const brandingCustom = useLang("brandingdisplayimage_customoption");
  const soundPackSelect = useLang("soundPackSelect");
  const soundPackDefault = useLang("defaultSoundsOption");

  function convertImageToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        const arrayBuffer = event.target?.result;
        const base64Image = btoa(
          String.fromCharCode(...new Uint8Array(arrayBuffer as ArrayBuffer))
        );
        resolve(base64Image);
      };
      fileReader.onerror = function (error) {
        Promise.reject(`Failed to convert image to Base64: ${error}`);
      };
      fileReader.readAsArrayBuffer(file);
    });
  }

  const getBrandingImageName = (brandingImageCode: string) => {
    switch (brandingImageCode) {
      case "null":
        return brandingNull;
      case "custom":
        return brandingCustom;
      default:
        return brandingImageCode;
    }
  };

  const setBrandingImage = (brandingImageCode: displayImageType) => {
    switch (brandingImageCode) {
      case "custom":
      default:
        debateContext.setConf({
          ...debateContext.conf,
          displayImage1: brandingImageCode,
        });
        break;
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    const input = e.target;
    if (!input.files) return;
    const file = input.files[0];
    const base64Image = await convertImageToBase64(file);
    debateContext.setConf({
      ...debateContext.conf,
      customDisplayImage: base64Image,
    });
    console.log(debateContext.conf.customDisplayImage);
  };

  return (
    <div className="mb-5 lg:mb-0">
      <h1 className="text-3xl mt-8 text-center font-serif">
        {useLang("oxfordDebateConfiguration")}
      </h1>
      <p className="text-center text-neutral-500">
        {debateContext.conf.motion || flavortext}
      </p>
      <div className="max-w-2xl mx-auto mt-8 flex flex-col gap-6 lg:gap-4 px-4">
        <DebateConfStringsPanel />
        <hr className="border-b-2 rounded border-neutral-800 my-2" />
        <input
          type="file"
          id="branding"
          name="branding"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageChange}
        />
        <GenericSelect
          text={brandingselect}
          value={getBrandingImageName(debateContext.conf.displayImage1)}
          options={displayImageTypeArray.map((el) => {
            return {
              value: getBrandingImageName(el),
              exec: () => setBrandingImage(el),
            };
          })}
        />
        <GenericSelect
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
                debateContext.setConf({ ...debateContext.conf, soundPack: soundPack });
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
        {/* TODO: */}
        {/* implement visualize protected speech functionality */}
        {/* selection disabled until implemented */}
        {/* <GenericButton
          text={useLang("visualizeProtected")}
          icon={debateContext.conf.visualizeProtectedTimes ? IconCheck : IconX}
          onClick={() => {
            debateContext.setConf({
              ...debateContext.conf,
              visualizeProtectedTimes:
                !debateContext.conf.visualizeProtectedTimes,
            });
          }}
        /> */}
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
          <LinkButton href="/" text={useLang("mainmenu")} icon={IconList} />
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
