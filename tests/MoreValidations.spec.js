import {test, expect} from '@playwright/test';
test('MoreValidations', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://google.com");
    //await page.goBack();
    //await page.goForward();
    await expect( page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect( page.locator("#displayed-text")).toBeHidden();
    //await page.pause();
    await page.locator("#alertbtn").click();
    page.on('dialog',dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const frame = await page.frameLocator("#courses-iframe");
    await frame.locator("b a[href*='lifetime-access']").click();
    const textcheck = await frame.locator(".text h2").textContent();
    console.log(textcheck.split(" ")[1]);

})