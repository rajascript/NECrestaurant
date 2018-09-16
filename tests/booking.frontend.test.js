const Page = require("./helpers/page");

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.goto("http://localhost:3000/booking");
});



//test.only("see the contents of Booking", async () => {
  //  console.log(await page.getContentsOf("#bookingFormContainer"))


//})

test("Contents of Booking", async () => {
    await page.waitForSelector('#bookingFormContainer');
	await page.click("input[id=bookingFormName]");
	await page.type("input[id=bookingFormName]", "hansika");
	await page.click("input[id=bookingFormPhone]");
	await page.type("input[id=bookingFormPhone]", '7849583932');
	await page.click("input[id=bookingFormEmail]");
	await page.type("input[id=bookingFormEmail]", "adhkiak@yahoo.com");
	
	await page.click("input[id=bookingFormDate]");
	await page.type("input[id=bookingFormDate]", "28-09-18 12:34");


await page.click("#submit");
})

afterEach(async () => {
	await page.close();
});