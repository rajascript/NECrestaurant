const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
var shortid = require("shortid");
module.exports = (app, firebaseDB) => {
	let bookingsRefString = "bookings";
	app.post(
		"/api/getBookings",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			bookingsRef = firebaseDB.ref("/");
			bookingsRef.on("value", function(snapshot) {
				snapshot.forEach(function(childSnapshot) {
					var childData = childSnapshot.val();
					res.json(childData);
				});
			});
		}
	);
	app.post(
		"/api/confirmBooking",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			const bookingId = req.body.bookingId;
			const slot = req.body.slot;
			const date = req.body.date;
			bookingsRef = firebaseDB.ref(bookingsRefString + "/" + date + "/" + slot);
			bookingData = {};
			bookingData[userId] = "confirmed";
			bookingsRef.set(bookingData);
		}
	);
	app.post(
		"/api/reserve",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			const bookingId = "admin-" + uuidv4();
			const slot = req.body.slot;
			const date = req.body.date;
			bookingsRef = firebaseDB.ref(bookingsRefString + "/" + date + "/" + slot);
			bookingData = {};
			bookingData[bookingId] = "confirmed";
			bookingsRef.set(bookingData);
		}
	);
	app.post(
		"/api/cancelBooking",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			const bookingId = req.body.bookingId;
			const slot = req.body.slot;
			const date = req.body.date;
			bookingsRef = firebaseDB.ref(bookingsRefString + "/" + date + "/" + slot);
			bookingData = {};
			bookingData.date = date;
			bookingData.slot = slot;

			bookingData[bookingId] = "canceled by restaurant";
			bookingsRef.set(bookingData);
		}
	);
	app.post("/api/revokeBooking", (req, res) => {
		const bookingId = req.body.bookingId;
		const slot = req.body.slot;
		const date = req.body.date;
		bookingsRef = firebaseDB.ref(bookingsRefString + "/" + date + "/" + slot);
		bookingData = {};
		bookingData[bookingId] = "canceled by user";
		bookingsRef.set(bookingData);
	});
	/**
	 * POST method for admin to revoke user booking request and refund some credits.
	 * @param bookingId
	 * @param slot
	 * @param date
	 * @param seats
	 * @param refundAmount
	 *
	 */
	app.post("/api/revokeAndRefundBooking", (req, res) => {
		const bookingId = req.body.bookingId;
		const slot = req.body.slot;
		const date = req.body.date;
		const refundAmount = req.body.refundAmount;
		bookingsRef = firebaseDB.ref(bookingsRefString + "/" + date + "/" + slot);
		bookingData = {};
		bookingData[bookingId] = "canceled and refunded";
		bookingsRef.set(bookingData);
		req.user.credits += refundAmount;
		new User(req.user).save();
	});
	/**
	 * POST method for user to post booking request.
	 * @param userId(only for logged in users.)
	 * @param slot
	 * @param date
	 * @param seats
	 * @param name
	 * @param email
	 */
	app.post("/api/requestBooking", (req, res) => {
		const shortId = shortid.generate();
		const bookingId = bookingId.generate();
		const { email, phone, slot, date, name, seats } = req.body;
		const userId = req.body.userId || shortId;
		bookingsRef = firebaseDB.ref(bookingsRefString + "/" + date + "/" + slot);
		bookingData = {};
		bookingData.status = "waiting";
		bookingData.email = email;
		bookingData.phone = phone;
		bookingData.name = name;
		bookingData.seats = seats;
		bookingData.bookingId = bookingId;
		bookingData.userId = userId;
		bookingsRef.child(bookingId).set(bookingData);
		res.status(200).send(bookingData);
	});
};
