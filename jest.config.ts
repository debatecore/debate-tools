/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: { "^.+\\.ts?$": "ts-jest" },
  testRegex: "/tests/unit-tests/.*\\.(test|spec)?\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
};
