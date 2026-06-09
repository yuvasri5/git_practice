import {test, expect} from '@playwright/test';
test('Calender', async({page})=>{
    const Month ="6";
    const date="15";
    const year="2027";
    const eList=[Month,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(Month)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
    const input = await page.locator(".react-date-picker__inputGroup__input");
    for(let i=0;i<eList.length;i++){
        const value =await input.nth(i).inputValue();
        expect(value).toEqual(eList[i]);
    }
})