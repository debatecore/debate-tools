import { test, expect } from "@playwright/test";
import strings from "@/data/strings.json";
import { displayImageTypeArray } from "@/types/debate";

const predefinedImagesToTest = displayImageTypeArray.filter(
  (element) => !["null", "custom"].includes(element)
);

predefinedImagesToTest.forEach((imageid) => {
  test(`setup->display of image: ${imageid}`, async ({ page }, testinfo) => {
    await page.goto("http://localhost:3000/oxford-debate/setup");

    await page.locator("#clockimageselect-selectbutton").click();
    await page.locator(`#clockimageselect-option-${imageid}`).click();

    await page.getByRole("button", { name: strings.startDebate.en }).click();
    await page.waitForURL("http://localhost:3000/oxford-debate");

    const img = await page.getByRole("img", { name: imageid });
    await expect(img).toHaveJSProperty("complete", true);
    await expect(img).toHaveAttribute("data-loaded", "true");

    const screenshot = await page.screenshot({ fullPage: true });
    await testinfo.attach(
      `setup->display of image: ${imageid} test - full page screenshot`,
      {
        body: screenshot,
        contentType: "image/jpg",
      }
    );
  });
});
