import {test, expect} from '@playwright/test';
test.only('Assginment1',async({browser, page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("chintayuvasri5@gmail.com");
    await page.locator("#userPassword").fill("Yuvasri@5");
    await page.locator("[type='submit']").click();
   // console.log(await page.locator(".card-body b").first().textContent());
   //await page.waitForLoadState("networkidle");
   await page.locator(".card-body b").last().waitFor();
    console.log(await page.locator(".card-body b").allTextContents());
});