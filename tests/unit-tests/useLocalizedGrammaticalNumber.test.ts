import { localizedMinutesPl } from "@/lib/useLocalizedGrammaticalNumber";

describe("test Polish localization of 'minutes'", () => {
  test("0 minute", () => {
    expect(localizedMinutesPl(0)).toEqual("minut");
  });

  test("1 minute", () => {
    expect(localizedMinutesPl(1)).toEqual("minuta");
  });

  test("2 minutes", () => {
    expect(localizedMinutesPl(2)).toEqual("minuty");
  });

  test("5 minutes", () => {
    expect(localizedMinutesPl(5)).toEqual("minut");
  });

  test("12 minutes", () => {
    expect(localizedMinutesPl(12)).toEqual("minut");
  });

  test("21 minutes", () => {
    expect(localizedMinutesPl(21)).toEqual("minut");
  });

  test("23 minutes", () => {
    expect(localizedMinutesPl(23)).toEqual("minuty");
  });
});
