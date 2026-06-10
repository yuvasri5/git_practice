import{test,expect} from "@playwright/test";
test('IRCTC', async({page})=>{
    await page.goto("https://www.irctc.co.in/nget/train-search");
    const from ="Hyd";
    const to = "chen";
    const fromLocation = " HYDERABAD DECAN - HYB ";
    const toLocation= " CHENNAI EGMORE - MS ";
    const date ="8"
    await page.locator("[role='searchbox']").first().pressSequentially(from);
    //const dropdown = await page.locator("div[role='listbox']");
    await page.locator("[role='option']").filter({hasText: fromLocation}).click();
    await page.locator("[role='searchbox']").last().pressSequentially(to);
    await page.locator("[role='option']").filter({hasText: toLocation}).click();
    await page.locator("input.ui-state-default").last().click();
    await page.locator(".pi-chevron-right").click();
    await page.locator("td a.ng-star-inserted").filter({hasText: date}).first().click();
    await page.locator(".ui-dropdown-trigger-icon").first().click();
    await page.locator(".ui-dropdown-item").filter({hasText: "AC First Class (1A) "}).click();
    await page.locator(".ui-dropdown-trigger-icon").last().click();
    await page.locator(".ui-dropdown-item").filter({hasText: "LADIES"}).click();
    await page.locator("[type='submit']").click();
    await page.pause();


})