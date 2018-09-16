const Page = require("./helpers/page");

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.goto("http://localhost:3000/");
});

afterEach(async () => {
	await page.close();
});

test("login success", async () => {
    await page.click('#headerButtonLogin');
    await page.waitForSelector('#loginFormContainer');
    await page.click("input[id=loginFormEmail]");
    await page.type("input[id=loginFormEmail]", "abc@yahoo.com");
	await page.click("input[id=loginFormPassword]");
    await page.type("input[id=loginFormPassword]", '123qwerty');

    await page.click("#submitL");   

});

test("login fail", async () => {
    await page.click('#headerButtonLogin');
    await page.waitForSelector('#loginFormContainer');
    await page.click("input[id=loginFormEmail]");
    await page.type("input[id=loginFormEmail]", "abc@yahoo.com");
	await page.click("input[id=loginFormPassword]");
    await page.type("input[id=loginFormPassword]", '123qgfwerty');

    await page.click("#submitL");   
    const check = await page.getContentsOf("#loginPopupError");
    expect(check).toEqual("Error: Wrong credentials")

});