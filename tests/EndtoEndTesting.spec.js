import {test, expect} from '@playwright/test';
test('EndtoEndTesting', async({browser, page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email ="chintayuvasri5@gmail.com";
    const product = "ZARA COAT 3";
    await page.locator("#userEmail").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Yuvasri@5");
    await page.locator('[value=Login]').click();
    await page.locator(".card-body b").first().waitFor();
    const cardTitels = await page.locator(".card-body b");
    console.log(await page.locator(".card-body b").allTextContents());
    
    const products= await page.locator("div .card-body");
    const count = await products.count();
    for (let i=0;i<count;i++){
        if(await products.nth(i).locator("b").textContent() == product){
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*=cart]").click();
    await page.locator("li").first().allTextContents();
    expect(await page.locator("h3:hasText('ZARA COAT 3')")).toBeTruthy();
    await page.locator("text =Checkout").click();
    await page.locator("input.txt").nth(1).fill("666");
    await page.locator("[placeholder*=Country]").pressSequentially("Ind");
    const dropdown =await page.locator("section.ta-results");
    await dropdown.waitFor();
    const doptions =await dropdown.locator("button").count();
    for(let i=0;i<doptions;i++){
        if(await dropdown.locator("button").nth(i).textContent() == " India"){
            await dropdown.locator("button").nth(i).click();
            break;

        }
    }
    await page.locator(".action__submit").click();
    expect (await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    //const orderID= await page.locator("label.ng-star-inserted").textContent();
    const orderID = (await page.locator("label.ng-star-inserted").textContent()).trim()
    console.log(orderID);
    await page.locator("[routerlink*=myorders]").first().click();
    await page.locator("tbody").waitFor();
    const rows =await page.locator("tbody tr");
    const rcount = await rows.count();
    for(let i=0;i<rcount;i++){
        const roworderid= await rows.nth(i).locator("th").textContent();
        
        if(orderID.includes(roworderid)){
            await rows.nth(i).locator(".btn-primary").first().click();
        }
    } 
   
    const orderdetails =await page.locator("div .-main").textContent();
    expect(orderID.includes(orderdetails)).toBeTruthy();
    await page.pause();

})