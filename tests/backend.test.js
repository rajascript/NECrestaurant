const Page = require("./helpers/page");
const { testHost } = require("../config/keys");

beforeEach(async () => {
	page = await Page.build();
	await page.goto(testHost);
});

afterEach(async () => {
	await page.close();
});

test("server is running", async () => {
	let res = await page.get("/checkserver");

	expect(res).toEqual(42);
});
