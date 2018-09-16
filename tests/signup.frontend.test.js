const Page = require("./helpers/page");

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.goto("http://localhost:3000/");
});

afterEach(async () => {
	await page.close();
});

test("signupForm check", async () => {
	await page.click("#headerButtonSignup");
	await page.waitForSelector("#signupFormContainer");
	await page.click("input[id=signupFormEmail]");
	await page.type("input[id=signupFormEmail]", "abc@yahoo.com");
	await page.click("input[id=signupFormPassword]");
	await page.type("input[id=signupFormPassword]", "123qwerty");
	await page.click("input[id=signupFormConfirmPassword]");
	await page.type("input[id=signupFormConfirmPassword]", "123qwerty");
	await page.click("input[id=signupFormName]");
	await page.type("input[id=signupFormName]", "hansika");
	await page.click("input[id=signupFormPhone]");
	await page.type("input[id=signupFormPhone]", "8482592952");
	await page.click("#submitS");
});

test("signup fails because email is poorly formatted", async () => {
	await page.click("#headerButtonSignup");
	await page.waitForSelector("#signupFormContainer");
	await page.click("input[id=signupFormEmail]");
	await page.type("input[id=signupFormEmail]", "a.bc@yahoocom");
	await page.click("input[id=signupFormPassword]");
	await page.type("input[id=signupFormPassword]", "123qwerty");
	await page.click("input[id=signupFormConfirmPassword]");
	await page.type("input[id=signupFormConfirmPassword]", "123qwerty");
	await page.click("input[id=signupFormName]");
	await page.type("input[id=signupFormName]", "hansika");
	await page.click("input[id=signupFormPhone]");
	await page.type("input[id=signupFormPhone]", "8482592952");
	await page.click("#submitS");
	await page.waitForSelector("#loginPopupError");
	const errorMessage = await page.getContentsOf("#loginPopupError");
	expect(errorMessage).toEqual("Email is poorly formatted");
});
