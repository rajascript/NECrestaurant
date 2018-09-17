const Page = require("../helpers/page");
const { testHost } = require("../../config/keys");
const axios = require("axios");
let curHost = testHost + "/api/signup";
console.log(curHost);
beforeEach(async () => {
	page = await Page.build();
	//	await page.goto(testHost);
});

afterEach(async () => {
	await page.close();
});

test("phone wrong", async () => {
	let user = {
		phone: 9823,
		name: "raja",
		email: "sdaa@fa.com",
		password: "sadaax"
	};
	let res = await page.post(curHost, user);
	console.log(res);
	//expect(res).toEqual(42);
});

//TO-DO add signup tests
/*
	query http://localhost:5000/api/signup
	required {email:String, password:String, name:String}
		1. The email should contain @ and a dot.
		2. The password must be atleast 6 characters long.
		3. The name cannot contain special characters.
		4. Successful signups should see "success" message.
		5. If user already exists and tries to signup, he  should see "already exist" message.	
*/

//TO-DO add login tests
/*
	query http://localhost:5000/api/login
	required {email:String, password:String}
		1. The email should contain @ and a dot.
		2. The password must be atleast 6 characters long.
		4. Successful logins should see user details in response.
		5. Unsuccessful login attempts should see 403(forbidden) status in response.
*/
