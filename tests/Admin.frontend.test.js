const Page = require("./helpers/page");

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.goto("http://localhost:3000/adminLogin");
});

afterEach(async () => {
	await page.close();
});

test("Authenticated Admin", async () => {
    await page.click("")
})