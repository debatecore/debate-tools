describe("test the non-breaking spaces function", () => {
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
