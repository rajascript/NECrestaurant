const Page = require("./helpers/page");

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.goto("http://localhost:3000/");
});

afterEach(async () => {
	await page.close();
});

test("Header works", async () => {
	const text = await page.getContentsOf("p");
	expect(text).toEqual("I am a header.");
});

test("Browser", async () => {
	const check = await page.performExecution("navigator.userAgent");
	console.log(check);
});
