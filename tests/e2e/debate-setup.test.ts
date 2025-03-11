import { test, expect } from "@playwright/test";
import {
  getConfiguredMotion,
  getConfiguredSoundPack,
  getConfiguredTeamName,
  getTimeAsSeenByUser,
} from "./debate-setup-utils";
test.describe("default debate setup", () => {
  test("time inputs: minutes", async ({ page }) => {
    // GIVEN
    const url = "http://localhost:3000/oxford-debate/setup";
    await page.goto(url);
    await page.waitForURL(url);

    // WHEN
    const minutes = await getTimeAsSeenByUser("Speech", 5, "minute", page);
    const protectedTime = await getTimeAsSeenByUser(
      "Protected",
      0,
      "minute",
      page
    );
    const adVocem = await getTimeAsSeenByUser("Ad vocem", 1, "minute", page);

    // THEN
    expect(minutes).toBe("5 minutes");
    expect(protectedTime).toBe("0 minutes");
    expect(adVocem).toBe("1 minute");
  });

  test("time inputs: seconds", async ({ page }) => {
    // GIVEN
    const url = "http://localhost:3000/oxford-debate/setup";
    await page.goto(url);
    await page.waitForURL(url);

    // WHEN
    const minutes = await getTimeAsSeenByUser("Speech", 0, "second", page);
    const protectedTime = await getTimeAsSeenByUser(
      "Protected",
      30,
      "second",
      page
    );
    const adVocem = await getTimeAsSeenByUser("Ad vocem", 0, "second", page);

    // THEN
    expect(minutes).toBe("0 seconds");
    expect(protectedTime).toBe("30 seconds");
    expect(adVocem).toBe("0 seconds");
  });

  test("team names", async ({ page }) => {
    // GIVEN
    const url = "http://localhost:3000/oxford-debate/setup";
    await page.goto(url);
    await page.waitForURL(url);

    // WHEN
    const proposition = await getConfiguredTeamName("Proposition", page, true);
    const opposition = await getConfiguredTeamName("Opposition", page, true);

    // THEN
    expect(proposition).toBe("");
    expect(opposition).toBe("");
  });

  test("motion", async ({ page }) => {
    // GIVEN
    const url = "http://localhost:3000/oxford-debate/setup";
    await page.goto(url);
    await page.waitForURL(url);

    // WHEN
    const motion = await getConfiguredMotion(page, true);

    // THEN
    expect(motion).toBe("");
  });

  test("sound pack", async ({ page }) => {
    // GIVEN
    const url = "http://localhost:3000/oxford-debate/setup";
    const defaultSoundPackName = "Default";
    await page.goto(url);
    await page.waitForURL(url);

    // WHEN
    const actualSoundPackName = await getConfiguredSoundPack(
      defaultSoundPackName,
      page
    );

    // THEN
    expect(actualSoundPackName).toBe(defaultSoundPackName);
  });
});
