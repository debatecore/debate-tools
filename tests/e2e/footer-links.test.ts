import { test, expect } from "@playwright/test";

test("debatecore homepage", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("link", { name: "debatecore" }).click();
  await expect(page).toHaveTitle(/.*debatecore.*/);
  await expect(page).toHaveURL("https://debateco.re");
});

test("about page", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveTitle(/.*debatecore.*/);
  await expect(page).toHaveURL("https://debateco.re/about");
});

test("license page", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("link", { name: "License (AGPLv3)" }).click();
  await expect(page).toHaveTitle(/.*debate-tools\/LICENSE.*/);
  await expect(page).toHaveURL(
    "https://github.com/debatecore/debate-tools/blob/master/LICENSE"
  );
});

test("debate tools repo", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("link", { name: "Source code" }).click();
  await expect(page).toHaveTitle(/.*debatecore\/debate-tools.*/);
  await expect(page).toHaveURL("https://github.com/debatecore/debate-tools");
});
