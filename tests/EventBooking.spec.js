import {test, expect} from '@playwright/test';
test('EventBooking', async({page})=>{
    //Step 1
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").fill("chintayuvasri5@gmail.com");
    await page.getByLabel("Password").fill("Yuvasri@5");
    await page.locator("#login-btn").click();
    await expect(page.getByText("Browse Events →")).toBeVisible();
    //Step 2
    const EventTitle = "Yuva's Concert";
    await page.getByText("Browse Events →").click();
    await page.locator("[type*='button']", { hasText: "Add New Event" }).click();
    await page.locator("#event-title-input").fill(EventTitle);
    await page.getByPlaceholder("Describe the event…").fill("Music concert by Yuva");
    await page.locator("#city").fill("Hyderabad");
    await page.locator("#venue").fill("TankBund");
    await page.getByLabel("Event Date & Time").fill("2026-06-20T19:00");
    await page.getByLabel("Price ($)*").fill("100");
    await page.locator("#total-seats").fill("50");
    await page.locator("#add-event-btn").click();
    await expect(page.getByText("Event created!")).toBeVisible();


    //Step 3
    await page.locator("#nav-events").click();
    await page.locator("#event-card").first().waitFor();
    const allcards = await page.locator("#event-card").allTextContents();
    console.log(allcards);
    const eventCard = await page.locator("#event-card").filter({hasText: EventTitle}).first();
    expect (eventCard).toBeVisible();
    const cardTitle = await eventCard.locator(".flex-col  a[href*='/events/'] h3").textContent();
    const SeatsBeforeBooking = await eventCard.locator("div .text-emerald-600").textContent();
    console.log("Seats Before Booking: " + SeatsBeforeBooking);
    //Step 4
    await eventCard.locator("#book-now-btn").click();

    //Step 5
    expect(await page.locator("#ticket-count").filter({hasText: "1"})).toBeVisible();
    await page.locator("#customerName").fill("Yuvasri");
    await page.locator("#customer-email").fill("chintayuvasri5@gmail.com");
    await page.locator("#phone").fill("1234567891");
    await page.getByRole("button", { name: "Confirm Booking" }).click();

    //Step 6
    
    await expect(page.locator(".booking-ref")).toBeVisible();
    const bookingReference = await page.locator(".booking-ref").textContent();
    console.log("Booking Reference: " + bookingReference);

    //Step 7
    await page.locator("#nav-bookings").click();
    const allBookingCards = await page.locator("#booking-card").allTextContents();
    console.log(allBookingCards);
    const concertcard= await page.locator("#booking-card").filter({hasText: EventTitle}).first();
    expect(await page.locator("#booking-card").first()).toBeVisible();
    await expect(page.locator("#booking-card").filter({hasText: bookingReference}).first()).toBeVisible();
    await expect(page.locator("#booking-card").filter({hasText: EventTitle}).first()).toBeVisible();

    //Step 8
    await page.locator("#nav-events").click();
    await page.locator("#event-card").first().waitFor();
    const eventcardAfter = await page.locator("#event-card").filter({has: page.locator(".flex-col  a[href*='/events/'] h3")}).filter({hasText: EventTitle}).first();
    await expect(eventcardAfter).toBeVisible();
    const SeatsAfterBooking = await eventcardAfter.locator("div .text-emerald-600").textContent();
    console.log("Seats After Booking: " + SeatsAfterBooking);

    expect(parseInt(SeatsAfterBooking)).toBe(parseInt(SeatsBeforeBooking) - 1);

})