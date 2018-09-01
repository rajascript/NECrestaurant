const Page = require("./helpers/page");

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.goto("http://localhost:3000");
});

afterEach(async () => {
	await page.close();
});

test("server is running", async () => {
	let res = await page.get("/");
	expect(res).toEqual(42);
});
