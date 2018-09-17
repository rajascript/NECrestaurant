const Page = require("../helpers/page");
const { testHost } = require("../../config/keys");
var shortid = require("shortid");
let curHost = testHost + "/api/login";
console.log(curHost);
beforeEach(async () => {
	page = await Page.build();
	//	await page.goto(testHost);
});

afterEach(async () => {
	await page.close();
});

test("email wrong", async () => {
	let user = {
		email: "sdaa@facom",
		password: "sadaax"
	};
	let res = await page.post(curHost, user);

	expect(res.message).toEqual("login failed");
});
test("password wrong", async () => {
	let user = {
		email: "sdaa@facom",
		password: "sada"
	};
	let res = await page.post(curHost, user);

	expect(res.message).toEqual("login failed");
});
test.only("login successful", async () => {
	let user = {
		email: "uabc@gmail.com",
		password: "12345678"
	};
	let res = await page.post(curHost, user);
	console.log(res);
	expect(res.email).toEqual("uabc@gmail.com");
});
