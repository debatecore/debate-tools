import { test, expect } from "@playwright/test";
import strings from "@/data/strings.json";
import { displayImageTypeArray } from "@/types/debate";

const predefinedImagesToTest = displayImageTypeArray.filter(
  (element) => !["null", "custom"].includes(element)
);

predefinedImagesToTest.forEach((imageid) => {
  test(`setup->display of image: ${imageid}`, async ({
    page,
    browserName,
  }, testinfo) => {
    await page.goto("http://localhost:3000/oxford-debate/setup");

    await page.locator("#clockimageselect-selectbutton").click();
    await page.locator(`#clockimageselect-option-${imageid}`).click();

    await page.getByRole("button", { name: strings.startDebate.en }).click();
    await page.waitForURL("http://localhost:3000/oxford-debate");

    await page.getByRole("img", { name: imageid }).click();
    const screenshot = await page.screenshot({
      path: `screenshot-${imageid}-${browserName}.jpg`,
      fullPage: true,
    });
    await testinfo.attach("image screenshot", {
      body: screenshot,
      contentType: "image/jpg",
    });
  });
});
