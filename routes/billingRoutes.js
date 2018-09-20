const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const Transaction = mongoose.model("Transaction");
module.exports = app => {
	app.post("/api/stripe", requireLogin, async (req, res) => {
		console.log(req.body);
		let token = req.body.id;
		let transactionId = req.body.orderId;
		try {
			const charge = await stripe.charges.create({
				amount: req.body.amount,
				currency: "inr",
				source: token
			});
			t = await new Transaction({ id: transactionId, success: true });
			t.save();
			res.send(t);
		} catch (err) {
			console.log("error at stripe api", err);
			t = new Transaction({ id: transactionId, success: false });
			t.save();
			res.send(403).json({ responseError: "tranasaction failed." });
		}
	});
	app.post("/api/cod", requireLogin, async (req, res) => {
		console.log(req.body);
		let transactionId = req.body.orderId;
		//if()
		try {
			t = await new Transaction({ id: transactionId, success: true });
			t.save();
			//const user = await req.user.save();
			res.send(t);
		} catch (err) {
			console.log("error at stripe api", err);
			t = new Transaction({ id: transactionId, success: false });
			t.save();
			res.send(403).json({ responseError: "tranasaction failed." });
		}
	});
};
