const Page = require("./helpers/page");

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.goto("http://localhost:3000/");
});

afterEach(async () => {
	await page.close();
});

test("logging with google", async () => {
    await page.click("#Options")
    await page.click("#googleButton") 
    await page.url();
    await page.goto(page.url(), {waitUntil: 'networkidle'})

    
})