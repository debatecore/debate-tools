const motionTypesObjects = [
  { type: "Teza deskryptywna", lang: "pl" },
  { type: "Teza faktograficzna", lang: "pl" },
  { type: "Teza pierwszoosobowa", lang: "pl" },
  { type: "Teza porównawcza", lang: "pl" },
  { type: "Teza powinnościowa", lang: "pl" },
  { type: "Teza o działaniu", lang: "pl" },
  { type: "Teza o wartościach", lang: "pl" },
  { type: "Teza oceniająca", lang: "pl" },
  { type: "Należy żałować...", lang: "pl" },
  { type: "Comparative motion", lang: "en" },
  { type: "First-person motion", lang: "en" },
  { type: "Motion of duty", lang: "en" },
  { type: "Motion of fact", lang: "en" },
  { type: "Motion of policy", lang: "en" },
  { type: "This House Regrets...", lang: "en" },
  { type: "This House Supports...", lang: "en" },
] as const;
export { motionTypesObjects as motionTypesObjects };

/**
 * Names of motion types written in their respective languages
 */
const motionTypesArray = [
  "Teza deskryptywna",
  "Teza faktograficzna",
  "Teza pierwszoosobowa",
  "Teza porównawcza",
  "Teza powinnościowa",
  "Teza o działaniu",
  "Teza o wartościach",
  "Teza oceniająca",
  "Należy żałować...",
  "Comparative motion",
  "First-person motion",
  "Motion of duty",
  "Motion of fact",
  "Motion of policy",
  "This House Regrets...",
  "This House Supports...",
] as const;
export { motionTypesArray };

/**
 * Represents a motion type name based upon {@link motionTypesArray}
 */
type motionTypeName = (typeof motionTypesArray)[number];
export type { motionTypeName as motionTypeCode };

type motion = {
  lang: string;
  motion: string;
  adinfo: string;
  source: string;
  type: string;
};

export type { motion };
