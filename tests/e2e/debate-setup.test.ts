import { Page } from "@playwright/test";

async function getTimeAsSeenByUser(
  value: "Speech" | "Ad vocem" | "Protected",
  time: "minute" | "second",
  page: Page
): Promise<string> {
  const element = await page.getByText(`${value} time-`).getByText(time);
  const text = await element.textContent();
  if (text) {
    return text;
  } else {
    throw Error(`Failed to read ${value} ${time}s`);
  }
}

async function getTeamName(
  side: "Proposition" | "Opposition",
  page: Page
): Promise<string> {
  const name = await page.getByPlaceholder(`${side} Team`).inputValue();
  if (name || name == "") {
    return name;
  } else {
    throw Error(`Failed to read ${side} name`);
  }
}

async function getMotion(page: Page): Promise<string> {
  const motion = await page.getByPlaceholder("Debate motion").inputValue();
  if (motion || motion == "") {
    return motion;
  } else {
    throw Error("Failed to read motion");
  }
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
  page: Page
) {
  const button = page.getByRole("button", { name: buttonLabel });
  if (await button.locator("svg.feather-x").isVisible()) {
    return false;
  } else if (await button.locator("svg.feather-check").isVisible()) {
    return true;
  }
  throw Error(`Failed to get value of button "${buttonLabel}"`);
}

export {
  getMotion as getConfiguredMotion,
  getTeamName as getConfiguredTeamName,
  getTimeAsSeenByUser,
  manuallyChangeTime,
  getBooleanButtonValue,
};
