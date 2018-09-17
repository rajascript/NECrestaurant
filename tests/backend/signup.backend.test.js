const Page = require("../helpers/page");
const { testHost } = require("../../config/keys");
let currPath = testHost+"/api/signup";
console.log(currPath)
beforeEach(async () => {
	page = await Page.build();
	//await page.goto(testHost+"/api/signup");
});

afterEach(async () => {
	await page.close();
});

test("signup fails when phone number is wrong", async () => {
	let values = {phone:9873,email:"rrrsadka@gmail.com",password:"21312321",name:"raja"}
	let res = await page.post(currPath,values)
	console.log(res)
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
