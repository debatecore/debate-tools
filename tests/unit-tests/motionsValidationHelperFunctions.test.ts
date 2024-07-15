import { motion } from "@/types/motion";

describe("non-breaking spaces function", () => {
  test("numbers", () => {
    expect(containsNonBreakingSpaces("12 days of Christmas")).toBe(false);
    expect(containsNonBreakingSpaces("12\u00a0days of Christmas")).toBe(true);
    expect(containsNonBreakingSpaces("1 000 000")).toBe(false);
    expect(containsNonBreakingSpaces("1\u00a0000\u00a0000")).toBe(true);
  });

  test("single letters mid-sentence", () => {
    expect(containsNonBreakingSpaces("that's a must")).toBe(false);
    expect(containsNonBreakingSpaces("that's a\u00a0must")).toBe(true);
    expect(containsNonBreakingSpaces("klaszczę i śmieję się")).toBe(false);
    expect(containsNonBreakingSpaces("klaszczę i\u00a0śmieję się")).toBe(true);
  });

  test("single letters at the start of the string", () => {
    expect(containsNonBreakingSpaces("i may not live to see our glory")).toBe(
      false
    );
    expect(
      containsNonBreakingSpaces("i\u00a0may not live to see our glory")
    ).toBe(true);
    expect(containsNonBreakingSpaces("a 3-hours-long commute")).toBe(false);
    expect(containsNonBreakingSpaces("a\u00a03-hours-long commute")).toBe(true);
    expect(containsNonBreakingSpaces("i śmieci")).toBe(false);
    expect(containsNonBreakingSpaces("i\u00a0śmieci")).toBe(true);
    expect(
      containsNonBreakingSpaces(
        "W interesie Polski leży wprowadzenie bezwarunkowego dochodu podstawowego."
      )
    ).toBe(false);
    expect(
      containsNonBreakingSpaces(
        "W\u00a0interesie Polski leży wprowadzenie bezwarunkowego dochodu podstawowego."
      )
    ).toBe(true);
  });
});

describe("quotation marks functions", () => {
  const badEnglishMotionPolishQuotes: motion = {
    lang: "en",
    adinfo: "no info",
    motion: "This motion I have made up. I call it „The test motion.”",
    source: "i made it up, 12.30.2005",
    type: "yes",
  };

  const goodEnglishMotion: motion = {
    lang: "en",
    adinfo: "no info",
    motion: 'This motion I have made up. I call it "The test motion."',
    source: "i made it up 01.20.2005",
    type: "yes",
  };

  const badPolishMotionEnglishQuotes: motion = {
    lang: "pl",
    adinfo: "brak",
    motion: 'To jest "niekoniecznie poprawna polska teza"',
    source: "IDZD, 12.30.2005",
    type: "owszem",
  };

  const goodPolishMotionNoQuotationMarks: motion = {
    lang: "pl",
    adinfo: "brak",
    motion: "To jest teza bez cudzysłowów.",
    source: "IDZD, 12.30.2005",
    type: "owszem",
  };

  test("language-compatible question marks", () => {
    expect(hasLanguageCompatibleQuotationMarks(goodEnglishMotion)).toBe(true);
    expect(
      hasLanguageCompatibleQuotationMarks(goodPolishMotionNoQuotationMarks)
    ).toBe(true);

    expect(
      hasLanguageCompatibleQuotationMarks(badEnglishMotionPolishQuotes)
    ).toBe(false);
    expect(
      hasLanguageCompatibleQuotationMarks(badPolishMotionEnglishQuotes)
    ).toBe(false);
  });

  test("nested quotation marks", () => {
    expect(
      hasCorrectlyNestedQuotationMarks(
        "To są „poprawnie zagnieżdżone «cudzysłowy»”."
      )
    ).toBe(true);
    expect(
      hasCorrectlyNestedQuotationMarks(
        "To są „niepoprawnie zagnieżdżone „cudzysłowy”, wiesz o tym?”."
      )
    ).toBe(false);
  });

  test("closing quotation marks", () => {
    expect(hasClosingQuotationMarks('"This is a correct quote".')).toBe(true);
    expect(hasClosingQuotationMarks('"Two correct quotes". "Bang".')).toBe(
      true
    );
    expect(hasClosingQuotationMarks("„Oto poprawny polski cytat”.")).toBe(true);
    expect(
      hasClosingQuotationMarks("„Tu są nawet” „dwa prawie poprawne cytaty”.")
    ).toBe(true);

    expect(hasClosingQuotationMarks('"This is not a proper quote.')).toBe(
      false
    );
    expect(hasClosingQuotationMarks('Neither is this one".')).toBe(false);
    expect(
      hasClosingQuotationMarks('"This one is correct" "But only to an extent.')
    ).toBe(false);
    expect(
      hasClosingQuotationMarks("„Tutaj mamy wyłącznie otwarcie nawiasu.")
    ).toBe(false);
    expect(hasClosingQuotationMarks("A tu tylko zamknięcie”.")).toBe(false);
    expect(
      hasClosingQuotationMarks(
        "„Tutaj komuś dobrze szło”, ale „passa się skończyła."
      )
    ).toBe(false);
  });
});

describe("dates formatting", () => {
  test("no comma separating source and date", () => {
    expect(noCommaBetweenDate("Historia w\u00a0Trasie 2023")).toBe(true);

    expect(noCommaBetweenDate("Historia w\u00a0Trasie, 2023")).toBe(false);
  });
});

describe("other single-sentence functions", () => {
  test("'not empty function'", () => {
    expect(isNotEmpty("")).toBe(false);
    expect(isNotEmpty(undefined)).toBe(false);
    expect(isNotEmpty(null)).toBe(false);
    expect(isNotEmpty("bajojajo")).toBe(true);
  });

  test("'ends with a period' function", () => {
    expect(endsWithPeriod("This sentence is properly ended.")).toBe(true);
    expect(endsWithPeriod("This sentence is not")).toBe(false);
  });

  test("'starts with a capital letter' function", () => {
    expect(startsWithCapitalLetter("This sentence is properly started.")).toBe(
      true
    );
    expect(startsWithCapitalLetter("this sentence is not")).toBe(false);
  });
  expect(
    startsWithCapitalLetter("ówcześnie wiele zdań zaczyna się małą literą")
  ).toBe(false);

  test("'has closing brackets' function", () => {
    expect(
      hasClosingBrackets("This is a correct usage of brackets (of course).")
    ).toBe(true);
    expect(hasClosingBrackets("This one (is) (cool).")).toBe(true);

    expect(hasClosingBrackets("This one (is uncool.")).toBe(false);
    expect(hasClosingBrackets("Such as this one).")).toBe(false);
    expect(hasClosingBrackets("This one is (partially) (correct.")).toBe(false);
  });
});

function containsNonBreakingSpaces(sentence: string): boolean {
  const numbersPattern = new RegExp(/\d+ [ąężśźćół\w]+/, "ig");
  const lettersMidSentencePattern = new RegExp(/ \w [ąężśźćół\w]+/, "ig");
  const letterAtTheStartPattern = new RegExp(/^\w [ąężśźćół\w]+/, "ig");

  if (sentence.match(numbersPattern)) return false;
  if (sentence.match(lettersMidSentencePattern)) return false;
  if (sentence.match(letterAtTheStartPattern)) return false;
  return true;
}

function hasLanguageCompatibleQuotationMarks(motion: motion): boolean {
  let badQuotationMarksPattern = undefined;
  if (motion.lang == "pl") {
    badQuotationMarksPattern = new RegExp(/"/, "ig");
  } else {
    badQuotationMarksPattern = new RegExp(/[„”]/, "ig");
  }
  for (const [key, value] of Object.entries(motion)) {
    if (value.match(badQuotationMarksPattern)) {
      return false;
    }
  }
  return true;
}

function hasCorrectlyNestedQuotationMarks(sentence: string): boolean {
  const incorrectlyNestedQuotesPattern = /(„.*[”„"].*”)/;
  if (sentence.match(incorrectlyNestedQuotesPattern)) {
    return false;
  }
  return true;
}

function hasClosingQuotationMarks(sentence: string): boolean {
  const missingQuotationMarksPattern =
    /„[^”]*$|^[^„]*”|^([^"]|"[^"]+")*"[^"]*$/;
  if (sentence.match(missingQuotationMarksPattern)) {
    return false;
  }
  return true;
}

function noCommaBetweenDate(source: string) {
  const commaBeforeDatePattern = /, \d{4}/;
  if (source.match(commaBeforeDatePattern)) {
    return false;
  }
  return true;
}

function isNotEmpty(sentence?: string | null): boolean {
  if (sentence == "" || sentence == undefined || sentence == null) {
    return false;
  }
  return true;
}

function endsWithPeriod(sentence: string): boolean {
  const endsWithPeriodPattern = /\.$/;
  if (!sentence.match(endsWithPeriodPattern)) {
    return false;
  }
  return true;
}

function startsWithCapitalLetter(sentence: string): boolean {
  const lowercaseBeginningPattern = /^[a-ząęśćźżół]/;
  if (sentence.match(lowercaseBeginningPattern)) {
    return false;
  }
  return true;
}

function hasClosingBrackets(sentence: string): boolean {
  const missingQuotationMarksPattern = /(\([^()]*$|^[^(]*\))/;
  if (sentence.match(missingQuotationMarksPattern)) {
    return false;
  }
  return true;
}

export {
  containsNonBreakingSpaces,
  hasLanguageCompatibleQuotationMarks,
  hasCorrectlyNestedQuotationMarks,
  noCommaBetweenDate,
  isNotEmpty,
  endsWithPeriod,
  startsWithCapitalLetter,
  hasClosingBrackets,
};
