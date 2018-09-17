const Page = require("../helpers/page");
const { testHost } = require("../../config/keys");
var shortid = require("shortid");
let curHost = testHost + "/api/admin/login";
console.log(curHost);
beforeEach(async () => {
	page = await Page.build();
	//	await page.goto(testHost);
});

afterEach(async () => {
	await page.close();
});
test("login successful", async () => {
	let user = {
		username: "rajaraghav",
		password: "meluwiwoqa"
	};
	let res = await page.post(curHost, user);
	console.log(res);
    expect(res.user.username).toEqual("rajaraghav");
    
});