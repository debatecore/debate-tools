import { DebateContext } from "@/contexts/DebateContext";
import {
  convertImageToBase64,
  getBase64ImageFromPath,
} from "@/lib/imageToBase64";
import { test, expect, Page } from "@playwright/test";
import { propagateServerField } from "next/dist/server/lib/render-server";
import { useContext } from "react";

test("default setup: minutes", async ({ page }) => {
  // GIVEN
  await page.goto("http://localhost:3000/oxford-debate/setup");

  // WHEN
  const minutes = await getTime("Speech", "minute", page);
  const protectedTime = await getTime("Protected", "minute", page);
  const adVocem = await getTime("Ad vocem", "minute", page);

  // THEN
  expect(minutes).toBe("5  minutes");
  expect(protectedTime).toBe("0  minutes");
  expect(adVocem).toBe("1  minute");
});

test("default setup: seconds", async ({ page }) => {
  // GIVEN
  await page.goto("http://localhost:3000/oxford-debate/setup");

  // WHEN
  const minutes = await getTime("Speech", "second", page);
  const protectedTime = await getTime("Protected", "second", page);
  const adVocem = await getTime("Ad vocem", "second", page);

  // THEN
  expect(minutes).toBe("0 seconds");
  expect(protectedTime).toBe("30 seconds");
  expect(adVocem).toBe("0 seconds");
});

test("default setup: names", async ({ page }) => {
  // GIVEN
  await page.goto("http://localhost:3000/oxford-debate/setup");

  // WHEN
  const proposition = await getTeamName("Proposition", page);
  const opposition = await getTeamName("Opposition", page);

  // THEN
  expect(proposition).toBe("");
  expect(opposition).toBe("");
});

test("default setup: motion", async ({ page }) => {
  // GIVEN
  await page.goto("http://localhost:3000/oxford-debate/setup");

  // WHEN
  const motion = await getMotion(page);

  // THEN
  expect(motion).toBe("");
});

test("url params: team names", async ({ page }) => {
  // GIVEN
  await page.goto(
    "http://localhost:3000/oxford-debate/setup?propositionName=Debate%20Team%20Buster&oppositionName=Drużyna%20Kamienia"
  );

  // WHEN
  const propositionName = await getTeamName("Proposition", page);
  const oppositionName = await getTeamName("Opposition", page);

  // THEN
  expect(propositionName).toBe("Debate Team Buster");
  expect(oppositionName).toBe("Drużyna Kamienia");
});

test("url params: English motion", async ({ page }) => {
  // GIVEN
  const motionInput = "This House Would abolish the UN Security Council.";
  await page.goto(
    `http://localhost:3000/oxford-debate/setup?motion=${motionInput}`
  );

  // WHEN
  const motionOutput = await getMotion(page);

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
  const motionOutput = await getMotion(page);

  // THEN
  expect(motionOutput).toBe(motionInput);
});

test("url params: time inputs", async ({ page }) => {
  // GIVEN
  await page.goto(
    "http://localhost:3000/oxford-debate/setup?speechTime=240&protectedTime=15&adVocemTime=90"
  );

  // WHEN
  const speechTimeMinutes = await getTime("Speech", "minute", page);
  const protectedTimeSeconds = await getTime("Protected", "second", page);
  const adVocemMinutes = await getTime("Ad vocem", "minute", page);
  const adVocemSeconds = await getTime("Ad vocem", "second", page);

  // THEN
  expect(speechTimeMinutes).toBe("4  minutes");
  expect(protectedTimeSeconds).toBe("15 seconds");
  expect(adVocemMinutes).toBe("1  minute");
  expect(adVocemSeconds).toBe("30 seconds");
});

test("url params: clock image", async ({ page }, testinfo) => {
  // GIVEN
  const base64Image = getBase64ImageFromPath(
    "tests/assets/black_mesa_lambda.png"
  );
  await page.goto(
    `http://localhost:3000/oxford-debate/setup?clockImage=data:image/png;base64, ${base64Image}`
  );

  // WHEN
  await page.getByRole("button", { name: "Start debate" }).click();
  await page.waitForURL("http://localhost:3000/oxford-debate");

  // THEN
  const img = await page.getByRole("img", { name: "custom" });
  await expect(img).toHaveJSProperty("complete", true);
  await expect(img).toHaveAttribute("data-loaded", "true");

  const screenshot = await page.screenshot({ fullPage: true });
  await testinfo.attach(
    `setup->display of image: "custom" test - full page screenshot`,
    {
      body: screenshot,
      contentType: "image/jpg",
    }
  );
});

async function getTime(
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
