import { Locator, Page } from "@playwright/test";

const RETRY_TIMEOUT = 250;

async function getTimeAsSeenByUser(
  value: "Speech" | "Ad vocem" | "Protected",
  expectedValue: number,
  time: "minute" | "second",
  page: Page
): Promise<string> {
  const element = page
    .getByText(`${value} time-`)
    .getByText(`${expectedValue} ${time}`);
  const text = await element.textContent();
  if (text) {
    return text;
  } else {
    throw Error(`Failed to read ${value} ${time}s`);
  }
}

async function getTeamName(
  side: "Proposition" | "Opposition",
  page: Page,
  empty: boolean = false
): Promise<string> {
  let name = "";
  const nameElement = page.getByPlaceholder(`${side} Team`);
  name = await nameElement.inputValue();
  while (!empty && name == "") {
    await page.waitForTimeout(RETRY_TIMEOUT); // This is necessary, as URL params are usually parsed with a slight delay
    name = await nameElement.inputValue();
  }
  return name;
}

async function getMotion(page: Page, empty = false): Promise<string | null> {
  let motion = "";
  const motionElement = page.getByPlaceholder("Debate motion");
  motion = await motionElement.inputValue();
  while (!empty && motion == "") {
    await page.waitForTimeout(RETRY_TIMEOUT); // This is necessary, as URL params are usually parsed with a slight delay
    motion = await motionElement.inputValue();
  }
  return motion;
}

async function manuallyChangeTime(
  value: "Speech" | "Ad vocem" | "Protected",
  time: "second" | "minute",
  change: "increase" | "decrease",
  page: Page
) {
  const section = page.getByText(`${value} time-`);
  const buttonLabel = getTimeInputButtonLabel(change);
  if (time == "minute") {
    await section.getByText(buttonLabel).first().click();
  } else {
    await section.getByText(buttonLabel).last().click();
  }
}

function getTimeInputButtonLabel(change: "increase" | "decrease"): string {
  if (change == "increase") {
    return "+";
  } else {
    return "-";
  }
}

async function getBooleanButtonValue(
  buttonLabel:
    | "Beep on speech end"
    | "Beep on protected time"
    | "Protect time on speech start",
  expectedValue: boolean,
  page: Page
) {
  const button = page.getByRole("button", { name: buttonLabel });
  let value;
  while (value != expectedValue) {
    if (await button.locator("svg.feather-x").isVisible()) {
      value = false;
    } else if (await button.locator("svg.feather-check").isVisible()) {
      value = true;
    }
    if (value == expectedValue) {
      return value;
    } else {
      await page.waitForTimeout(RETRY_TIMEOUT); // This is necessary, as URL params are usually parsed with a slight delay
    }
  }
  throw Error(`Failed to get value of button "${buttonLabel}"`);
}

async function fillAndCheckTextBox(
  locator: Locator,
  desiredInput: string,
  page: Page
) {
  let actualInputValue = "";
  while (actualInputValue != desiredInput) {
    await locator.fill(desiredInput);
    const actualInputValue = await locator.inputValue();
    if (actualInputValue == desiredInput) {
      return actualInputValue;
    } else {
      await page.waitForTimeout(RETRY_TIMEOUT);
    }
  }
}

export {
  getMotion as getConfiguredMotion,
  getTeamName as getConfiguredTeamName,
  getTimeAsSeenByUser,
  manuallyChangeTime,
  getBooleanButtonValue,
  fillAndCheckTextBox,
};
