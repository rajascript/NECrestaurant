const orderTemplates = require("../services/emailTemplates/orderTemplates");
const Mailer = require("../services/Mailer");
const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const request = require("request");
const axios = require("axios");
const User = mongoose.model("User");
const Transaction = mongoose.model("Transaction");
var shortid = require("shortid");
module.exports = (app, firebaseDB) => {
	let ordersRefString = "orders";
	app.post(
		"/api/fetchOrders",
		passport.authenticate("jwt", { session: false }),
		async (req, res) => {
			try {
				firebaseRes = await axios.get(
					keys.firebaseDatabaseURL +
						"/orders/" +
						req.body.date +
						"/" +
						req.body.date +
						".json"
				);
				res.status(200).json(firebaseRes.data);
			} catch (ex) {
				console.log("error at fectchorders", ex);
				res.status(300).json({ errorMessage: "Server not working properly." });
			}
		}
	);
	app.post(
		"/api/confirmOrder",
		passport.authenticate("jwt", { session: false }),
		async (req, res) => {
			console.log("cnf", req.body);
			const orderId = req.body.orderId;
			const time = req.body.time;
			const date = req.body.date;
			const name = req.body.name;
			const email = req.body.userEmail;
			const by = req.body.by;
			try {
				let ordersRef = await firebaseDB.ref(
					ordersRefString + "/" + date + "/" + date + "/" + time + "/" + orderId
				);
				orderData = {};
				orderData.status = "confirmed";
				orderData.by = by;
				await ordersRef.update(orderData);
				try {
					axios.post(`${keys.testHost}/api/orderMailer`, {
						orderId: req.body.orderId,
						time: req.body.time,
						date: req.body.date,
						userEmail: email,
						name: name,
						status: orderData.status
					});
				} catch (ex) {
					console.log("request exception in sending mail.");
					res
						.status(200)
						.json({ response: "Order confirmed.", orderId: orderId });
				}
				res
					.status(200)
					.json({ response: "Order confirmed.", orderId: orderId });
			} catch (ex) {
				console.log("exception in confirmorder", ex);
				res.status(500).json({
					responseError: "Internal Server Error, try again.",
					orderId: orderId
				});
			}
		}
	);

	app.post(
		"/api/cancelOrder",
		passport.authenticate("jwt", { session: false }),
		async (req, res) => {
			const orderId = req.body.orderId;
			const time = req.body.time;
			const date = req.body.date;
			const by = req.body.by;
			const name = req.body.name;
			const email = req.body.userEmail;
			try {
				let ordersRef = await firebaseDB.ref(
					ordersRefString + "/" + date + "/" + date + "/" + time + "/" + orderId
				);
				orderData = {};
				orderData.by = by;
				orderData.status = "canceled by restaurant";
				await ordersRef.update(orderData);
				try {
					axios.post(`${keys.testHost}/api/orderMailer`, {
						orderId: req.body.orderId,
						time: req.body.time,
						date: req.body.date,
						userEmail: email,
						name: name,
						status: orderData.status
					});
				} catch (ex) {
					console.log("request exception in sending mail.");
					res
						.status(200)
						.json({ response: "Order canceled.", orderId: orderId });
				}
				res.status(200).json({ response: "Order canceled", orderId: orderId });
			} catch (ex) {
				console.log("exception in cancelOrder", ex);
				res.status(500).json({
					responseError: "Internal Server Error, try again.",
					orderId: orderId
				});
			}
		}
	);
	app.post("/api/revokeOrder", async (req, res) => {
		const orderId = req.body.orderId;
		const time = req.body.time;
		const date = req.body.date;
		const by = req.body.by;
		try {
			ordersRef = await firebaseDB.ref(
				ordersRefString + "/" + date + "/" + date + "/" + time + "/" + orderId
			);
			orderData = {};
			orderData.by = by;
			orderData.status = "canceled by user";

			await ordersRef.update(orderData);
			try {
				axios.post(`${keys.testHost}/api/orderMailer`, {
					orderId: req.body.orderId,
					time: req.body.time,
					date: req.body.date,
					userEmail: email,
					name: name,
					status: orderData.status
				});
			} catch (ex) {
				console.log("request exception in sending mail.");
				res.status(200).json({ response: "Order revoked.", orderId: orderId });
			}
			res.status(200).json({ response: "Order revoked.", orderId: orderId });
		} catch (ex) {
			console.log("exception in revokeOrder", ex);
			res.status(500).json({
				responseError: "Internal Server Error, try again.",
				orderId: orderId
			});
		}
	});
	/**
	 * POST method for admin to revoke user booking request and refund some credits.
	 * @param orderId
	 * @param time
	 * @param date
	 * @param items
	 * @param refundAmount
	 *
	 */
	app.post("/api/revokeAndRefundOrder", async (req, res) => {
		const orderId = req.body.orderId;
		const time = req.body.time;
		const date = req.body.date;
		const refundAmount = req.body.refundAmount;
		const by = req.body.by;
		const name = req.body.name;
		const email = req.body.userEmail;

		orderData = {};
		orderData.by = by;
		orderData.status = "canceled and refunded";
		if (req.user) {
			req.user.credits += refundAmount;
			try {
				await new User(req.user).save();
			} catch (ex) {
				console.log("exception in rnrorder", ex);
				res.status(500).json({
					responseError: "Internal Server Error, try again.",
					orderId: orderId
				});
			}
			try {
				ordersRef = await firebaseDB.ref(
					ordersRefString + "/" + date + "/" + date + "/" + time + "/" + orderId
				);
				await ordersRef.update(orderData);
				try {
					axios.post(`${keys.testHost}/api/orderMailer`, {
						orderId: req.body.orderId,
						time: req.body.time,
						date: req.body.date,
						userEmail: email,
						name: name,
						status: orderData.status
					});
				} catch (ex) {
					console.log("request exception in sending mail.");
					res.status(200).json({
						response: "Order canceled and refunded.",
						orderId: orderId
					});
				}
				res.status(200).json({
					response: "Booking canceled and user refunded",
					orderId: orderId
				});
			} catch (ex) {
				req.user.credits -= refundAmount;
				new User(req.user).save();
				console.log("exception in confirmBookin", ex);
				res.status(500).json({
					responseError: "Internal Server Error, try again.",
					orderId: orderId
				});
			}
		} else {
			res
				.status(404)
				.json({ responseError: "User doesn't exist.", orderId: orderId });
		}
	});
	/**
	 * POST method for user to post booking request.
	 * @param userId(only for logged in users.)
	 * @param time
	 * @param date
	 * @param items
	 * @param name
	 * @param email
	 */
	app.post("/api/requestOrder", async (req, res) => {
		console.log("dnajkdas");
		const shortId = shortid.generate();
		if (req.body.cod === false) {
			let transaction = await Transaction.find({ id: req.body.orderId });
			if (!transaction.success) {
				res
					.status(403)
					.json({ responseError: "Transaction failed. Please retry" });
			} else {
				const {
					email,
					phone,
					time,
					date,
					name,
					items,
					address,
					orderId,
					cod
				} = req.body;

				const userId = req.body.userId || shortId;

				ordersRef = await firebaseDB.ref(
					ordersRefString + "/" + date + "/" + date + "/" + time
				);
				orderData = {};
				orderData.status = "waiting";
				orderData.email = email;
				orderData.phone = phone;
				orderData.address = address;
				orderData.name = name;
				orderData.items = items;
				orderData.orderId = orderId;
				orderData.userId = userId;
				orderData.cod = cod;
				orderData.by = "user";
				try {
					await ordersRef.child(orderId).set(orderData);
					res.status(200).send(orderData);
				} catch (ex) {
					console.log("exception in requestBooking", ex);
					res
						.status(500)
						.json({ responseError: "Internal Server Error, try again." });
				}
			}
		} else {
			const {
				email,
				phone,
				time,
				date,
				name,
				items,
				address,
				orderId,
				cod
			} = req.body;

			const userId = req.body.userId || shortId;

			ordersRef = await firebaseDB.ref(
				ordersRefString + "/" + date + "/" + date + "/" + time
			);
			orderData = {};
			orderData.status = "waiting";
			orderData.email = email;
			orderData.phone = phone;
			orderData.address = address;
			orderData.name = name;
			orderData.items = items;
			orderData.orderId = orderId;
			orderData.userId = userId;
			orderData.cod = cod;
			orderData.by = "user";
			try {
				await ordersRef.child(orderId).set(orderData);
				res.status(200).send(orderData);
			} catch (ex) {
				console.log("exception in requestBooking", ex);
				res
					.status(500)
					.json({ responseError: "Internal Server Error, try again." });
			}
		}
	});
	app.post("/api/orderMailer", async (req, res) => {
		console.log("gia", req.body);
		const booker = {
			body: "Your booking at Indique.",
			dateSent: Date.now(),
			recipients: [req.body.userEmail],
			subject: "Your booking at Indique",
			title: "Booking at Indique"
		};

		const mailer = new Mailer(
			booker,
			orderTemplates(
				req.body.name,
				req.body.orderId,
				req.body.date,
				req.body.time,
				req.body.status
			)
		);
		try {
			await mailer.send();
		} catch (err) {
			console.log("error", err.response.body);
			res.status(422).send(err);
		}
	});
};
