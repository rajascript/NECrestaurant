const Page = require("./helpers/page");

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.goto("http://localhost:3000/");
});

afterEach(async () => {
	await page.close();
});

test("Authenticated Admin", async () => {
	await page.click("#adminHref")
	await page.click("input[id=adminUsername]");
	await page.type("input[id=adminUsername]", "alanturing");
	await page.click("input[id=adminPassword");
	await page.type("input[id=adminPassword]", "gisiverowa");
	await page.click("#submitA");
	console.log(await page.url());
})