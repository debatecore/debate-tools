import { getSpecificLangString, useLang } from "@/lib/useLang";
import { langsArray, langsPublicBlacklist } from "@/types/language";
import { GenericButton } from "./GenericButton";
import { motionTypes } from "@/types/motion";

const allowedLanguages = [
  ...langsArray
    .filter((lang) => !langsPublicBlacklist.includes(lang))
    .map((lang) => {
      return lang;
    }),
];

export default function MotionFilter() {
  return (
    <div className="absolute bg-zinc-800 p-3">
      <h5 className="text-center font-bold">{useLang("motionFilterTitle")}</h5>
      <section className="flex flex-col">
        <h6 className="text-center">{useLang("language")}</h6>
        {allowedLanguages.map((language) => (
          <label className="flex flex-row justify-between">
            <span>{getSpecificLangString("selfLanguageString", language)}</span>
            <input type="checkbox" value={language} />
          </label>
        ))}
      </section>
      <section>
        <h6 className="text-center">{useLang("motionType")}</h6>
        {motionTypes.map((motionType) => (
          <label className="flex flex-row justify-between">
            <span className="mr-2">{useLang(motionType.motionType)}</span>
            <input type="checkbox" value={motionType.motionType} />
          </label>
        ))}
      </section>
      <GenericButton text={useLang("filterButtonText")} />
    </div>
  );
}
export { MotionFilter };
