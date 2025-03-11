import { test, expect } from "@playwright/test";
import {
  fillAndCheckTextBox,
  getBooleanButtonValue,
  getConfiguredMotion,
  getConfiguredSoundPack,
  getConfiguredTeamName,
  getTimeAsSeenByUser,
  manuallyChangeTime,
} from "./debate-setup-utils";

test.describe("it should be possible to configure debate setups via URL params", () => {
  test.describe.configure({ timeout: 30000 });
  test("team names", async ({ page }) => {
    // GIVEN
    const url =
      "http://localhost:3000/oxford-debate/setup?proTeam=Debate%20Team%20Buster&oppTeam=Delusional%20Debaters";
    const expectedPropositionName = "Debate Team Buster";
    const expectedOppositionName = "Delusional Debaters";
    await page.goto(url);
    await page.waitForURL(url);

    // WHEN
    const propositionName = await getConfiguredTeamName("Proposition", page);
    const oppositionName = await getConfiguredTeamName("Opposition", page);

    // THEN
    expect(propositionName).toBe(expectedPropositionName);
    expect(oppositionName).toBe(expectedOppositionName);
  });

  test("English motion", async ({ page }) => {
    // GIVEN
    const motionInput = "This House Would abolish the UN Security Council.";
    const url = encodeURI(
      `http://localhost:3000/oxford-debate/setup?motion=${motionInput}`
    );
    await page.goto(url);
    await page.waitForURL(url);

    // WHEN
    const motionOutput = await getConfiguredMotion(page);

    // THEN
    expect(motionOutput).toBe(motionInput);
  });

  test("Polish motion", async ({ page }) => {
    // GIVEN
    const motionInput = "Należy żałować popularności astrologii.";
    const url = `http://localhost:3000/oxford-debate/setup?motion=${motionInput}`;
    await page.goto(url);
    await page.waitForURL(url);

    // WHEN
    const motionOutput = await getConfiguredMotion(page);

    // THEN
    expect(motionOutput).toBe(motionInput);
  });

  test("time inputs", async ({ page }) => {
    // GIVEN
    const url =
      "http://localhost:3000/oxford-debate/setup?speechTime=240&protectedTime=15&adVocemTime=90";
    await page.goto(url);
    await page.waitForURL(url);

    // WHEN
    const speechTimeMinutes = await getTimeAsSeenByUser(
      "Speech",
      4,
      "minute",
      page
    );
    const protectedTimeSeconds = await getTimeAsSeenByUser(
      "Protected",
      15,
      "second",
      page
    );
    const adVocemMinutes = await getTimeAsSeenByUser(
      "Ad vocem",
      1,
      "minute",
      page
    );
    const adVocemSeconds = await getTimeAsSeenByUser(
      "Ad vocem",
      30,
      "second",
      page
    );

    // THEN
    expect(speechTimeMinutes).toBe("4 minutes");
    expect(protectedTimeSeconds).toBe("15 seconds");
    expect(adVocemMinutes).toBe("1 minute");
    expect(adVocemSeconds).toBe("30 seconds");
  });

  test("manually change configuration after parsing the URL", async ({
    page,
  }) => {
    // GIVEN
    const oldMotion = "Należy żałować popularności astrologii.";
    const oldPropositionTeam = "Debate Team Buster";
    const oldOppositionTeam = "Delusional Debaters";
    const newPropositionTeam = "Wyścigówki Kubicy";
    const newOppositionTeam = "Gorsze Wyścigówki Kubicy";
    const newMotion = "Należy żałować.";
    const url = encodeURI(
      `http://localhost:3000/oxford-debate/setup?proTeam=${oldPropositionTeam}&oppTeam=${oldOppositionTeam}&speechTime=240&protectedTime=15&adVocemTime=90&motion=${oldMotion}`
    );
    await page.goto(url);
    await page.waitForURL(url);

    // Check parsed values
    expect(await getConfiguredTeamName("Proposition", page)).toBe(
      oldPropositionTeam
    );
    expect(await getConfiguredTeamName("Opposition", page)).toBe(
      oldOppositionTeam
    );
    expect(await getTimeAsSeenByUser("Speech", 4, "minute", page)).toBe(
      "4 minutes"
    );
    expect(await getTimeAsSeenByUser("Protected", 15, "second", page)).toBe(
      "15 seconds"
    );
    expect(await getTimeAsSeenByUser("Ad vocem", 1, "minute", page)).toBe(
      "1 minute"
    );
    expect(await getTimeAsSeenByUser("Ad vocem", 30, "second", page)).toBe(
      "30 seconds"
    );

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
    expect(await getTimeAsSeenByUser("Speech", 3, "minute", page)).toBe(
      "3 minutes"
    );
    expect(await getTimeAsSeenByUser("Ad vocem", 2, "minute", page)).toBe(
      "2 minutes"
    );
    expect(await getTimeAsSeenByUser("Protected", 1, "minute", page)).toBe(
      "1 minute"
    );
    expect(await getTimeAsSeenByUser("Speech", 15, "second", page)).toBe(
      "15 seconds"
    );
    expect(await getTimeAsSeenByUser("Ad vocem", 45, "second", page)).toBe(
      "45 seconds"
    );
    expect(await getTimeAsSeenByUser("Protected", 0, "second", page)).toBe(
      "0 seconds"
    );
  });

  test("booleanInputs", async ({ page }) => {
    // GIVEN
    const url =
      "http://localhost:3000/oxford-debate/setup?beepOnSpeechEnd=false&beepProtectedTime=false&startProtectedTime=30&endProtectedTime=30";
    await page.goto(url);
    await page.waitForURL(url);

    // THEN
    expect(await getBooleanButtonValue("Beep on speech end", false, page)).toBe(
      false
    );
    expect(
      await getBooleanButtonValue("Beep on protected time", false, page)
    ).toBe(false);
    expect(
      await getBooleanButtonValue("Protect time on speech start", true, page)
    ).toBe(true);
  });

  test("url params: clock image", async ({ page }, testinfo) => {
    // GIVEN
    const url =
      "http://localhost:3000/oxford-debate/setup?clockImage=https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Orange_lambda.svg/459px-Orange_lambda.svg.png";
    await page.goto(url);
    await page.waitForURL(url);

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

  test("copy motion to clipboard", async ({ page, context, browserName }) => {
    // GIVEN
    if (browserName == "chromium") {
      context.grantPermissions(["clipboard-read", "clipboard-write"]);
      // Clipboard permissions are chromium-only
    } else {
      return;
    }

    const url = "http://localhost:3000/oxford-debate/setup";
    const propositionTeam = "Wyścigówki Kubicy";
    const oppositionTeam = "Gorsze Wyścigówki Kubicy";
    const motion = "Należy żałować.";
    const soundPackName = "ZTM Poznań";

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
    await manuallyChangeTime("Speech", "second", "increase", page);
    await manuallyChangeTime("Ad vocem", "minute", "increase", page);
    await manuallyChangeTime("Ad vocem", "second", "increase", page);
    await manuallyChangeTime("Protected", "minute", "increase", page);
    await manuallyChangeTime("Protected", "second", "decrease", page);
    await page.getByRole("button", { name: "Beep on speech end" }).click();
    await page.getByRole("button", { name: "Default" }).click();
    await page.getByText(soundPackName).click();
    await page.getByRole("button", { name: "Copy debate" }).click();
    page.getByText("Debate link copied to clipboard");

    const clipboardContent = await page.evaluate(() =>
      navigator.clipboard.readText()
    );
    await page.goto(clipboardContent);
    await page.waitForURL(clipboardContent);

    // THEN
    expect(await getConfiguredMotion(page)).toBe(motion);
    expect(await getConfiguredTeamName("Proposition", page)).toBe(
      propositionTeam
    );
    expect(await getConfiguredTeamName("Opposition", page)).toBe(
      oppositionTeam
    );
    expect(await getTimeAsSeenByUser("Speech", 4, "minute", page)).toBe(
      "4 minutes"
    );
    expect(await getTimeAsSeenByUser("Ad vocem", 2, "minute", page)).toBe(
      "2 minutes"
    );
    expect(await getTimeAsSeenByUser("Protected", 0, "minute", page)).toBe(
      "0 minutes"
    );
    expect(await getTimeAsSeenByUser("Speech", 15, "second", page)).toBe(
      "15 seconds"
    );
    expect(await getTimeAsSeenByUser("Ad vocem", 15, "second", page)).toBe(
      "15 seconds"
    );
    expect(await getTimeAsSeenByUser("Protected", 30, "second", page)).toBe(
      "30 seconds"
    );
    expect(await getBooleanButtonValue("Beep on speech end", false, page)).toBe(
      false
    );
    expect(await getConfiguredSoundPack(soundPackName, page));
  });

  test("soundPacks", async ({ page }) => {
    // GIVEN
    const soundPackName = "ZTM Poznań";
    const url = encodeURI(
      `http://localhost:3000/oxford-debate/setup?soundPack=${soundPackName}`
    );
    await page.goto(url);
    await page.waitForURL(url);

    // THEN
    expect(await getConfiguredSoundPack(soundPackName, page)).toBe(
      soundPackName
    );
  });
});
