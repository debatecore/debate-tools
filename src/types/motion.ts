import { useLang } from "@/lib/useLang";

const motionTypesObjects = [
  { type: "motionPlDescriptive", lang: "pl" },
  { type: "motionPlFact", lang: "pl" },
  { type: "motionPlFirstPerson", lang: "pl" },
  { type: "motionPlComparative", lang: "pl" },
  { type: "motionPlDuty", lang: "pl" },
  { type: "motionPlPolicy", lang: "pl" },
  { type: "motionPlValues", lang: "pl" },
  { type: "motionPlEvaluative", lang: "pl" },
  { type: "motionPlRegret", lang: "pl" },
  { type: "motionEnComparative", lang: "en" },
  { type: "motionEnFirstPerson", lang: "en" },
  { type: "motionEnDuty", lang: "en" },
  { type: "motionEnFact", lang: "en" },
  { type: "motionEnPolicy", lang: "en" },
  { type: "motionEnRegret", lang: "en" },
  { type: "motionEnThisHouseSupports", lang: "en" },
] as const;
export { motionTypesObjects as motionTypesObjects };

const motionTypesArray = [
  "motionPlDescriptive",
  "motionPlFact",
  "motionPlFirstPerson",
  "motionPlComparative",
  "motionPlDuty",
  "motionPlPolicy",
  "motionPlValues",
  "motionPlEvaluative",
  "motionPlRegret",
  "motionEnComparative",
  "motionEnFirstPerson",
  "motionEnDuty",
  "motionEnFact",
  "motionEnPolicy",
  "motionEnRegret",
  "motionEnThisHouseSupports",
] as const;
export { motionTypesArray };

const MotionTypeTranslation = (type: motionTypeCode) => {
  return useLang(type);
};
export { MotionTypeTranslation };

/**
 * Represents a motion type code used in the translations file (strings.json)
 */
type motionTypeCode = (typeof motionTypesArray)[number];
export type { motionTypeCode };

type motion = {
  lang: string;
  motion: string;
  adinfo: string;
  source: string;
  type: string;
};

export type { motion };
