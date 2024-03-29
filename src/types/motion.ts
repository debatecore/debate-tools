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
  { type: "motionEnFirstPerson", lang: "en" },
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
  "motionEnFirstPerson",
  "motionEnFact",
  "motionEnPolicy",
  "motionEnRegret",
  "motionEnThisHouseSupports",
] as const;
export { motionTypesArray };

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
