import {test, expect} from '@playwright/test';
import { only } from 'node:test';
test('LocatorsValidation', async({browser, page})=>{
    const username = page.locator("#username");
    const title = page.locator(".card-title a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await username.fill("Yuvasri");
    await page.locator("#password").fill("Learning@830$3mK2");
    await page.locator("span.checkmark").last().check();
    //expect(await page.locator("span.checkmark").last().toBeChecked());
    console.log(await page.locator("span.checkmark").last().isChecked());
    await page.locator("select.form-control").selectText("consult");
    await page.locator("#terms").check();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms")).not.toBeChecked();
    //console.log(expect(await page.locator("#terms").check()).isChecked());
    await page.locator("#signInBtn").click();
    //console.log(await page.locator("[style*=' block']").textContent());
    //await expect(page.locator("[style*=' block']")).toContainText("Incorrect");
    //await username.fill("");
    //await username.fill("rahulshettyacademy")
    //await page.locator("#signInBtn").click();
    //console.log(await title.first().textContent());
    //console.log(await title.allTextContents());
    //await page.pause();
    await expect(page.locator("[href*='documents-req']")).toHaveAttribute("class","blinkingText");

});