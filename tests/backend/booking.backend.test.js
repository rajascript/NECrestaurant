const Page = require("../helpers/page");
const { testHost } = require("../../config/keys");
var shortid = require("shortid");
let curHost = testHost + "/api/requestBooking";
console.log(curHost);
beforeEach(async () => {
	page = await Page.build();
	//	await page.goto(testHost);
});

afterEach(async () => {
	await page.close();
});

test("booking request", async () => {
        let user = {
            email: "uabc@gmail.com",
            password: "12345678",
            phone:9865324789,
            slot:13,
            date:"12-10-2018",
            name:"abc",
            seats:3
        };
        let res = await page.post(curHost, user);
        console.log(res);
        expect(res.email).toEqual("uabc@gmail.com");
        
    });
    test("login successful", async () => {
        let user = {
            email: "uabc@gmail.com",
            password: "12345678"
        };
        let res = await page.post(curHost, user);
        console.log(res);
        expect(res.email).toEqual("uabc@gmail.com");
        
    });
