import { getSpecificLangString, useLang } from "@/lib/useLang";
import { langsArray, langsPublicBlacklist } from "@/types/language";
import { GenericButton } from "./GenericButton";

const allowedLanguages = [
  ...langsArray
    .filter((lang) => !langsPublicBlacklist.includes(lang))
    .map((lang) => {
      return {
        value: getSpecificLangString("selfLanguageString", lang),
      };
    }),
];

export default function MotionFilter() {
  return (
    <div className="absolute">
      <h5>{useLang("motionFilterTitle")}</h5>
      <section className="flex flex-col">
        <h6>{useLang("language")}</h6>
        {allowedLanguages.map((language) => (
          <label className="flex flex-row justify-between">
            <span>{language.value}</span>
            <input type="checkbox" />
          </label>
        ))}
      </section>
      <section>
        <h6>{useLang("motionType")}</h6>
      </section>
      <GenericButton text={useLang("filterButtonText")} />
    </div>
  );
}
export { MotionFilter };
