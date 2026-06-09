import {test,expect} from '@playwright/test';
test('ChildWindow', async({browser})=>{
    const context =await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("div a.blinkingText").first().click();
    const link = await page.locator("div a.blinkingText").first();
    const [newPage] =await Promise.all([
        context.waitForEvent('page'),
        link.click(),
    ])
    console.log(await newPage.locator(" p.red").textContent());
    const text = await newPage.locator(" p.red").textContent();
    const arraytext= text.split("@");
    const domain= arraytext[1].split(" ")[0];
    console.log(domain);
    //const username = await page.locator("#username")
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());

})