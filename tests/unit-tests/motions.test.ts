import { motion } from "@/types/motion";
import motions from "@/data/motion.json";
import {
  containsNonBreakingSpaces,
  endsWithPeriod,
  hasClosingBrackets,
  hasCorrectlyNestedQuotationMarks,
  hasLanguageCompatibleQuotationMarks,
  isNotEmpty,
  noCommaBetweenDate,
  startsWithCapitalLetter,
} from "./motionsValidationHelperFunctions.test";

motions.forEach((motion) => {
  describe(`${motion.motion}`, () => {
    test("quotation marks", () => {
      expect(hasLanguageCompatibleQuotationMarks(motion)).toBe(true);
    });

    test("fields ending with periods", () => {
      expect(endsWithPeriod(motion.adinfo) || motion.adinfo == "").toBe(true);
      expect(endsWithPeriod(motion.motion)).toBe(true);
      expect(endsWithPeriod(motion.source)).toBe(false);
      expect(endsWithPeriod(motion.type)).toBe(false);
    });

    test("date formatting", () => {
      expect(noCommaBetweenDate(motion.source)).toBe(true);
    });

    for (const [key, value] of Object.entries(motion)) {
      test(`${key}`, () => {
        expect(containsNonBreakingSpaces(value)).toBe(true);
        expect(hasCorrectlyNestedQuotationMarks(value)).toBe(true);
        expect(hasClosingBrackets(value)).toBe(true);
        if (key != "lang") {
          expect(startsWithCapitalLetter(value) || value == "").toBe(true);
        }
        if (key != "adinfo") {
          expect(isNotEmpty(value)).toBe(true);
        }
      });
    }
  });
});
