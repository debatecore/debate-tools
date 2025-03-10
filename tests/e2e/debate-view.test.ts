import { test, expect, Page } from "@playwright/test";
import {
  fillAndCheckTextBox,
  getConfiguredMotion,
  getConfiguredTeamName,
  getTimeAsSeenByUser,
  manuallyChangeTime,
} from "./debate-setup-utils";

test("configured strings should be visible in debate view", async ({
  page,
}) => {
  // GIVEN
  const url = "http://localhost:3000/oxford-debate/setup";
  const propositionTeam = "Wyścigówki Kubicy";
  const oppositionTeam = "Gorsze Wyścigówki Kubicy";
  const motion = "Należy żałować.";

  // WHEN
  await page.goto(url);
  await page.waitForURL(url);
  const propositionTextBox = page.getByPlaceholder("Proposition Team");
  await fillAndCheckTextBox(propositionTextBox, propositionTeam, page);
  const oppositionTextBox = page.getByPlaceholder("Opposition Team");
  await fillAndCheckTextBox(oppositionTextBox, oppositionTeam, page);
  const motionTextBox = page.getByPlaceholder("Debate motion");
  await fillAndCheckTextBox(motionTextBox, motion, page);

  await page.getByText("Start Debate").click();
  await page.waitForURL("http://localhost:3000/oxford-debate");

  // THEN
  const width = page.viewportSize()?.width;
  if (width == undefined) {
    throw Error("Failed to determine viewport width");
  }
  if (width > 1000) {
    expect(await getTeamName("Proposition", page)).toBe(propositionTeam);
    expect(await getTeamName("Opposition", page)).toBe(oppositionTeam);
  }
  await expect(page.getByText(motion)).toBeVisible();
});

test("debate configuration should persist after page changes", async ({
  page,
}) => {
  // GIVEN
  const url = "http://localhost:3000/oxford-debate/setup";
  const propositionTeam = "Wyścigówki Kubicy";
  const oppositionTeam = "Gorsze Wyścigówki Kubicy";
  const motion = "Należy żałować.";

  // WHEN
  await page.goto(url);
  await page.waitForURL(url);
  const propositionTextBox = page.getByPlaceholder("Proposition Team");
  await fillAndCheckTextBox(propositionTextBox, propositionTeam, page);
  const oppositionTextBox = page.getByPlaceholder("Opposition Team");
  await fillAndCheckTextBox(oppositionTextBox, oppositionTeam, page);
  const motionTextBox = page.getByPlaceholder("Debate motion");
  await fillAndCheckTextBox(motionTextBox, motion, page);
  await manuallyChangeTime("Speech", "minute", "decrease", page);

  await page.getByText("Start Debate").click();
  await page.waitForURL("http://localhost:3000/oxford-debate");
  await page.getByText("Debate configuration").click();
  await page.waitForURL("http://localhost:3000/oxford-debate/setup");

  // THEN
  expect(await getConfiguredTeamName("Proposition", page)).toBe(
    propositionTeam
  );
  expect(await getConfiguredTeamName("Opposition", page)).toBe(oppositionTeam);
  expect(await getConfiguredMotion(page)).toBe(motion);
  expect(await getTimeAsSeenByUser("Speech", 4, "minute", page)).toBe(
    "4 minutes"
  );
});

async function getTeamName(side: "Proposition" | "Opposition", page: Page) {
  const pattern = new RegExp(
    `.+as the ${side == "Proposition" ? "pro" : "op"}position`
  );
  return page.getByText(pattern).getByRole("heading").textContent();
}
