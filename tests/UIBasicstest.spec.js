//const {test, expect} = require('@playwright/test');
import {test, expect} from '@playwright/test';
import { type } from 'node:os';
//import { test, expect } from '@playwright/test';

test('Browser context playeright test',async ({browser})=>
    {
       const context =  await browser.newContext();
       const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/practice");


});

test('Page playwright test', async({page})=>{
    await page.goto("https://www.google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
    await page.locator('textarea[name="q"]').fill("Youtube");
    await page.keybord.press('Enter');
    
});