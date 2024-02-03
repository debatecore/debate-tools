const langsArray = ["en", "pl", "de", "jp"] as const;
export { langsArray };

// languages disallowed to be selected from public lang selection menu
const langsPublicBlacklist = ["jp"];
export { langsPublicBlacklist };

type language = (typeof langsArray)[number];
export type { language };
