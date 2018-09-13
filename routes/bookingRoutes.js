const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const uuid = require("uuid/v4");
module.exports = (app, firebaseDB) => {
	let bookingsRefString = "bookings";
	app.post("/api/getBookings", (req, res) => {
		bookingsRef = firebaseDB.ref("/");
		bookingsRef.on("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				var childData = childSnapshot.val();
				res.json(childData);
			});
		});
	});
	app.post("/api/confirmBooking", (req, res) => {
		const userId = req.body.userId;
		const slot = req.body.slot;
		const date = req.body.date;
		bookingsRef = firebaseDB.ref(bookingsRefString + "/" + date + "/" + slot);
		bookingData = {};
		bookingData[userId] = "confirmed";
		bookingsRef.set(bookingData);
	});
	app.post("/api/reserve", (req, res) => {
		const userId = "admin-" + uuidv4();
		const slot = req.body.slot;
		const date = req.body.date;
		bookingsRef = firebaseDB.ref(bookingsRefString + "/" + date + "/" + slot);
		bookingData = {};
		bookingData[userId] = "confirmed";
		bookingsRef.set(bookingData);
	});
	app.post("/api/cancelBooking", (req, res) => {
		const userId = req.body.userId;
		const slot = req.body.slot;
		const date = req.body.date;
		bookingsRef = firebaseDB.ref(bookingsRefString + "/" + date + "/" + slot);
		bookingData = {};
		bookingData.date = date;
		bookingData.slot = slot;

		bookingData[userId] = "canceled by restaurant";
		bookingsRef.set(bookingData);
	});
	app.post("/api/revokeBooking", (req, res) => {
		const userId = req.body.userId;
		const slot = req.body.slot;
		const date = req.body.date;
		bookingsRef = firebaseDB.ref(bookingsRefString + "/" + date + "/" + slot);
		bookingData = {};
		bookingData[userId] = "canceled by user";
		bookingsRef.set(bookingData);
	});
	/**
	 * POST method for admin to revoke user booking request and refund some credits.
	 * @param userId
	 * @param slot
	 * @param date
	 * @param seats
	 * @param refundAmount
	 *
	 */
	app.post("/api/revokeAndRefundBooking", (req, res) => {
		const userId = req.body.userId;
		const slot = req.body.slot;
		const date = req.body.date;
		const refundAmount = req.body.refundAmount;
		bookingsRef = firebaseDB.ref(bookingsRefString + "/" + date + "/" + slot);
		bookingData = {};
		bookingData[userId] = "canceled and refunded";
		bookingsRef.set(bookingData);
		req.user.credits += refundAmount;
		new User(req.user).save();
	});
	/**
	 * POST method for user to post booking request.
	 * @param userId
	 * @param slot
	 * @param date
	 * @param seats
	 */
	app.post("/api/requestBooking", (req, res) => {
		const userId = req.body.userId;
		const slot = req.body.slot;
		const date = req.body.date;
		bookingsRef = firebaseDB.ref(bookingsRefString + "/" + date + "/" + slot);
		bookingData = {};
		bookingData[userId] = "waiting";
		bookingData.seats = req.body.seats;
		bookingsRef.set(bookingData);
	});
};
