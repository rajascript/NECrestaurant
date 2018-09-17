const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const uuid = require("uuid/v4");
module.exports = (app, firebaseDB) => {
	let ordersRefString = "/orders";
	app.post("/api/getBookings", (req, res) => {
		bookingsRef = firebaseDB.ref(ordersRefString + "/");
		bookingsRef.on("child_added", snapshot => {
			console.log(snapshot);
			res.json(snapshot);
		});
	});
	app.post("/api/confirmBooking", (req, res) => {
		const userId = req.body.userId;
		const slot = req.body.slot;
		const date = req.body.date;
		bookingsRef = firebaseDB.ref(ordersRefString + "/" + date + "/" + slot);
		bookingData = {};
		bookingData[userId] = "confirmed";
		bookingsRef.set(bookingData);
	});
	app.post("/api/reserve", (req, res) => {
		const userId = "admin-" + uuidv4();
		const slot = req.body.slot;
		const date = req.body.date;
		bookingsRef = firebaseDB.ref(ordersRefString + "/" + date + "/" + slot);
		bookingData = {};
		bookingData[userId] = "confirmed";
		bookingsRef.set(bookingData);
	});
	app.post("/api/cancelBooking", (req, res) => {
		const userId = req.body.userId;
		const slot = req.body.slot;
		const date = req.body.date;
		bookingsRef = firebaseDB.ref(ordersRefString + "/" + date + "/" + slot);
		bookingData = {};
		bookingData[userId] = "canceled by restaurant";
		bookingsRef.set(bookingData);
	});
	app.post("/api/revokeBooking", (req, res) => {
		const userId = req.body.userId;
		const slot = req.body.slot;
		const date = req.body.date;
		bookingsRef = firebaseDB.ref(ordersRefString + "/" + date + "/" + slot);
		bookingData = {};
		bookingData[userId] = "canceled by user";
		bookingsRef.set(bookingData);
	});
	app.post("/api/revokeAndRefundBooking", (req, res) => {
		const userId = req.body.userId;
		const slot = req.body.slot;
		const date = req.body.date;
		const refundAmount = req.body.refundAmount;
		bookingsRef = firebaseDB.ref(ordersRefString + "/" + date + "/" + slot);
		bookingData = {};
		bookingData[userId] = "canceled and refunded";
		bookingsRef.set(bookingData);
		req.user.credits += refundAmount;
		new User(req.user).save();
	});
	app.post("/api/requestBooking", (req, res) => {
		const userId = req.body.userId;
		const slot = req.body.slot;
		const date = req.body.date;
		bookingsRef = firebaseDB.ref(ordersRefString + "/" + date + "/" + slot);
		bookingData = {};
		bookingData[userId] = "waiting";
		bookingsRef.set(bookingData);
	});
};
