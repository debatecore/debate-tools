import { test, expect, Page } from "@playwright/test";
import {
  getBooleanButtonValue,
  getConfiguredMotion,
  getConfiguredTeamName,
  getTimeAsSeenByUser,
  manuallyChangeTime,
} from "./debate-setup.test";

test("default setup: minutes", async ({ page }) => {
  // GIVEN
  await page.goto("http://localhost:3000/oxford-debate/setup");

  // WHEN
  const minutes = await getTimeAsSeenByUser("Speech", "minute", page);
  const protectedTime = await getTimeAsSeenByUser("Protected", "minute", page);
  const adVocem = await getTimeAsSeenByUser("Ad vocem", "minute", page);

  // THEN
  expect(minutes).toBe("5 minutes");
  expect(protectedTime).toBe("0 minutes");
  expect(adVocem).toBe("1 minute");
});

test("default setup: seconds", async ({ page }) => {
  // GIVEN
  await page.goto("http://localhost:3000/oxford-debate/setup");

  // WHEN
  const minutes = await getTimeAsSeenByUser("Speech", "second", page);
  const protectedTime = await getTimeAsSeenByUser("Protected", "second", page);
  const adVocem = await getTimeAsSeenByUser("Ad vocem", "second", page);

  // THEN
  expect(minutes).toBe("0 seconds");
  expect(protectedTime).toBe("30 seconds");
  expect(adVocem).toBe("0 seconds");
});

test("default setup: names", async ({ page }) => {
  // GIVEN
  await page.goto("http://localhost:3000/oxford-debate/setup");

  // WHEN
  const proposition = await getConfiguredTeamName("Proposition", page);
  const opposition = await getConfiguredTeamName("Opposition", page);

  // THEN
  expect(proposition).toBe("");
  expect(opposition).toBe("");
});

test("default setup: motion", async ({ page }) => {
  // GIVEN
  await page.goto("http://localhost:3000/oxford-debate/setup");

  // WHEN
  const motion = await getConfiguredMotion(page);

  // THEN
  expect(motion).toBe("");
});

test("url params: team names", async ({ page }) => {
  // GIVEN
  await page.goto(
    "http://localhost:3000/oxford-debate/setup?propositionName=Debate%20Team%20Buster&oppositionName=Delusional%20Debaters"
  );

  // WHEN
  const propositionName = await getConfiguredTeamName("Proposition", page);
  const oppositionName = await getConfiguredTeamName("Opposition", page);

  // THEN
  expect(propositionName).toBe("Debate Team Buster");
  expect(oppositionName).toBe("Delusional Debaters");
});

test("url params: English motion", async ({ page }) => {
  // GIVEN
  const motionInput = "This House Would abolish the UN Security Council.";
  await page.goto(
    `http://localhost:3000/oxford-debate/setup?motion=${motionInput}`
  );

  // WHEN
  const motionOutput = await getConfiguredMotion(page);

  // THEN
  expect(motionOutput).toBe(motionInput);
});

test("url params: Polish motion", async ({ page }) => {
  // GIVEN
  const motionInput = "Należy żałować popularności astrologii.";
  await page.goto(
    `http://localhost:3000/oxford-debate/setup?motion=${motionInput}`
  );

  // WHEN
  const motionOutput = await getConfiguredMotion(page);

  // THEN
  expect(motionOutput).toBe(motionInput);
});

test("url params: time inputs", async ({ page }) => {
  // GIVEN
  await page.goto(
    "http://localhost:3000/oxford-debate/setup?speechTime=240&protectedTime=15&adVocemTime=90"
  );

  // WHEN
  const speechTimeMinutes = await getTimeAsSeenByUser("Speech", "minute", page);
  const protectedTimeSeconds = await getTimeAsSeenByUser(
    "Protected",
    "second",
    page
  );
  const adVocemMinutes = await getTimeAsSeenByUser("Ad vocem", "minute", page);
  const adVocemSeconds = await getTimeAsSeenByUser("Ad vocem", "second", page);

  // THEN
  expect(speechTimeMinutes).toBe("4 minutes");
  expect(protectedTimeSeconds).toBe("15 seconds");
  expect(adVocemMinutes).toBe("1 minute");
  expect(adVocemSeconds).toBe("30 seconds");
});

test("url params: manually change configuration after parsing the URL", async ({
  page,
}) => {
  // GIVEN
  const motionInput = "Należy żałować popularności astrologii.";
  await page.goto(
    `http://localhost:3000/oxford-debate/setup?propositionName=Debate%20Team%20Buster&oppositionName=Delusional%20Debaters&speechTime=240&protectedTime=15&adVocemTime=90&motion=${motionInput}`
  );
  const newPropositionTeam = "Wyścigówki Kubicy";
  const newOppositionTeam = "Gorsze Wyścigówki Kubicy";
  const newMotion = "Należy żałować.";

  // WHEN
  await page.getByPlaceholder("Proposition Team").fill(newPropositionTeam);
  await page.getByPlaceholder("Opposition Team").fill(newOppositionTeam);
  await page.getByPlaceholder("Debate Motion").fill(newMotion);
  await manuallyChangeTime("Speech", "minute", "decrease", page);
  await manuallyChangeTime("Speech", "second", "increase", page);
  await manuallyChangeTime("Ad vocem", "minute", "increase", page);
  await manuallyChangeTime("Ad vocem", "second", "increase", page);
  await manuallyChangeTime("Protected", "minute", "increase", page);
  await manuallyChangeTime("Protected", "second", "decrease", page);

  // THEN
  expect(await getConfiguredTeamName("Proposition", page)).toBe(
    newPropositionTeam
  );
  expect(await getConfiguredTeamName("Opposition", page)).toBe(
    newOppositionTeam
  );
  expect(await getConfiguredMotion(page)).toBe(newMotion);
  expect(await getTimeAsSeenByUser("Speech", "minute", page)).toBe("3 minutes");
  expect(await getTimeAsSeenByUser("Ad vocem", "minute", page)).toBe(
    "2 minutes"
  );
  expect(await getTimeAsSeenByUser("Protected", "minute", page)).toBe(
    "1 minute"
  );
  expect(await getTimeAsSeenByUser("Speech", "second", page)).toBe(
    "15 seconds"
  );
  expect(await getTimeAsSeenByUser("Ad vocem", "second", page)).toBe(
    "45 seconds"
  );
  expect(await getTimeAsSeenByUser("Protected", "second", page)).toBe(
    "0 seconds"
  );
});

test("url params: booleanInputs", async ({ page }) => {
  // GIVEN
  await page.goto(
    "http://localhost:3000/oxford-debate/setup?beepOnSpeechEnd=false&beepProtectedTime=false&startProtectedTime=30&endProtectedTime=30"
  );

  // THEN
  expect(await getBooleanButtonValue("Beep on speech end", page)).toBe(false);
  expect(await getBooleanButtonValue("Beep on protected time", page)).toBe(
    false
  );
  expect(
    await getBooleanButtonValue("Protect time on speech start", page)
  ).toBe(true);
});

test("url params: clock image", async ({ page }, testinfo) => {
  // GIVEN
  await page.goto(
    "http://localhost:3000/oxford-debate/setup?clockImage=https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Orange_lambda.svg/459px-Orange_lambda.svg.png"
  );

  // WHEN
  await page.getByRole("button", { name: "Start debate" }).click();
  await page.waitForURL("http://localhost:3000/oxford-debate");
  const img = await page.getByRole("img", { name: "custom" });

  // THEN
  await expect(img).toHaveJSProperty("complete", true);
  await expect(img).toHaveAttribute("data-loaded", "true");
  const screenshot = await page.screenshot({ fullPage: true });
  await testinfo.attach("url params: custom clock image from link", {
    body: screenshot,
    contentType: "image/jpg",
  });
});

test("url params: copy motion to clipboard", async ({ page }) => {
  // GIVEN
  await page.goto("http://localhost:3000/oxford-debate/setup");
  const propositionTeam = "Wyścigówki Kubicy";
  const newOppositionTeam = "Gorsze Wyścigówki Kubicy";
  const motion = "Należy żałować.";

  // WHEN
  await page.getByPlaceholder("Proposition Team").fill(propositionTeam);
  await page.getByPlaceholder("Opposition Team").fill(newOppositionTeam);
  await page.getByPlaceholder("Debate Motion").fill(motion);
  await manuallyChangeTime("Speech", "minute", "decrease", page);
  await manuallyChangeTime("Speech", "second", "increase", page);
  await manuallyChangeTime("Ad vocem", "minute", "increase", page);
  await manuallyChangeTime("Ad vocem", "second", "increase", page);
  await manuallyChangeTime("Protected", "minute", "increase", page);
  await manuallyChangeTime("Protected", "second", "decrease", page);
  await page.getByRole("button", { name: "Copy debate" }).click();

  const clipboardContent = await page.evaluate(() =>
    navigator.clipboard.readText()
  );
  await page.goto(clipboardContent);

  // THEN
  expect(await getConfiguredMotion(page)).toBe(motion);
  expect(await getConfiguredTeamName("Proposition", page)).toBe(
    propositionTeam
  );
  expect(await getConfiguredTeamName("Opposition", page)).toBe(
    newOppositionTeam
  );
  expect(await getTimeAsSeenByUser("Speech", "minute", page)).toBe("4 minutes");
  expect(await getTimeAsSeenByUser("Ad vocem", "minute", page)).toBe(
    "2 minutes"
  );
  expect(await getTimeAsSeenByUser("Protected", "minute", page)).toBe(
    "1 minute"
  );
  expect(await getTimeAsSeenByUser("Speech", "second", page)).toBe(
    "15 seconds"
  );
  expect(await getTimeAsSeenByUser("Ad vocem", "second", page)).toBe(
    "45 seconds"
  );
  expect(await getTimeAsSeenByUser("Protected", "second", page)).toBe(
    "0 seconds"
  );
});
