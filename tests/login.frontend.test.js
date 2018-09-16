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
    await page.click('#headerButtonLogin');
    await page.waitForSelector('#loginFormContainer');
    await page.click("input[id=loginFormEmail]");
    await page.type("input[id=loginFormEmail]", "cba@yahoo.com");
	await page.click("input[id=loginFormPassword]");
    await page.type("input[id=loginFormPassword]", '123qwerty');

await page.click("#submit");

/*let correct;
if(correct = await page.waitFor("#loginPopupError"))
    expect(correct).toEqual("Error: Wrong Credentials")
*/
    

    

});