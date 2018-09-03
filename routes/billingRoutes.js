const keys = require("../Config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
	app.post("/api/stripe", requireLogin, async (req, res) => {
		let token = req.body.id;
		const charge = await stripe.charges.create({
			amount: 5000,
			currency: "inr",
			source: token
		});

		req.user.Credits += charge.amount;
		const user = await req.user.save();
		res.send(user);
	});
};
