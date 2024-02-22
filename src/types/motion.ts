const motionTypes = [
  { motionType: "motionPlDescriptive", lang: "pl" },
  { motionType: "motionPlFact", lang: "pl" },
  { motionType: "motionPlFirstPerson", lang: "pl" },
  { motionType: "motionPlComparative", lang: "pl" },
  { motionType: "motionPlDuty", lang: "pl" },
  { motionType: "motionPlPolicy", lang: "pl" },
  { motionType: "motionPlValues", lang: "pl" },
  { motionType: "motionPlEvaluative", lang: "pl" },
  { motionType: "motionPlRegret", lang: "pl" },
  { motionType: "motionEnFirstPerson", lang: "en" },
  { motionType: "motionEnFact", lang: "en" },
  { motionType: "motionEnPolicy", lang: "en" },
  { motionType: "motionEnRegret", lang: "en" },
  { motionType: "motionEnThisHouseSupports", lang: "en" },
] as const;
export { motionTypes };

type motion = {
  lang: string;
  motion: string;
  adinfo: string;
  source: string;
};

export type { motion };
