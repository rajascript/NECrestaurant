const Page = require("./helpers/page");

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.goto("http://localhost:3000/");
});

afterEach(async () => {
	await page.close();
});

test("loginForm check", async () => {
    // await page.click('#headerButtonSignup');
    await page.waitForSelector('#loginPopupButtonLogin');
    await page.click("input[id=loginFormEmail]");
    await page.type("input[id=loginFormEmail]", "abc@yahoo.com");
	await page.click("input[id=loginFormPassword]");
    await page.type("input[id=loginFormPassword]", '123qwerty');

await page.click("#submit");
    

});