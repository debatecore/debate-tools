import { test, expect, Page } from "@playwright/test";
import {
  getConfiguredMotion,
  getConfiguredTeamName,
  getTimeAsSeenByUser,
  manuallyChangeTime,
} from "./debate-setup.test";

test("configured strings should be visible in debate view", async ({
  page,
}) => {
  // GIVEN
  await page.goto("http://localhost:3000/oxford-debate/setup");
  const propositionTeam = "Wyścigówki Kubicy";
  const oppositionTeam = "Gorsze Wyścigówki Kubicy";
  const motion = "Należy żałować.";

  // WHEN
  await page.getByPlaceholder("Proposition Team").fill(propositionTeam);
  await page.getByPlaceholder("Opposition Team").fill(oppositionTeam);
  await page.getByPlaceholder("Debate Motion").fill(motion);
  await page.getByText("Start Debate").click();
  await page.waitForURL("http://localhost:3000/oxford-debate");

  // THEN
  await expect(await getTeamName("Proposition", page)).toBe(propositionTeam);
  await expect(await getTeamName("Opposition", page)).toBe(oppositionTeam);
  await expect(page.getByText(motion)).toBeVisible();
});

test("debate configuration should persist after page changes", async ({
  page,
}) => {
  // GIVEN
  await page.goto("http://localhost:3000/oxford-debate/setup");
  const propositionTeam = "Wyścigówki Kubicy";
  const oppositionTeam = "Gorsze Wyścigówki Kubicy";
  const motion = "Należy żałować.";

  // WHEN
  await page.getByPlaceholder("Proposition Team").fill(propositionTeam);
  await page.getByPlaceholder("Opposition Team").fill(oppositionTeam);
  await page.getByPlaceholder("Debate Motion").fill(motion);
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
  expect(await getTimeAsSeenByUser("Speech", "minute", page)).toBe("4 minutes");
});

async function getTeamName(side: "Proposition" | "Opposition", page: Page) {
  const pattern = new RegExp(
    `.+as the ${side == "Proposition" ? "pro" : "op"}position`
  );
  return page.getByText(pattern).getByRole("heading").textContent();
}
