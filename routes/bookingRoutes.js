const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
var shortid = require("shortid");
module.exports = (app, firebaseDB) => {
	let bookingsRefString = "bookings";
	app.post(
		"/api/fetchBookings",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			try {
				bookingsRef = firebaseDB.ref("bookings/" + req.body.date);
				bookingsRef.on("value", function(snapshot) {
					if (snapshot.numChildren() === 0)
						res.status(454).json({ responseError: "No bookings here." });
					snapshot.forEach(function(childSnapshot) {
						var childData = childSnapshot.val();
						res.status(200).json(childData);
					});
				});
			} catch (ex) {
				console.log("error at fectchbookings", ex);
				res.status(300).json({ errorMessage: "Server not working properly." });
			}
		}
	);
	app.post(
		"/api/confirmBooking",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			console.log(req.body);
			const bookingId = req.body.bookingId;
			const slot = req.body.slot;
			const date = req.body.date;
			const by = req.body.by;
			try {
				bookingsRef = firebaseDB.ref(
					bookingsRefString +
						"/" +
						date +
						"/" +
						date +
						"/" +
						slot +
						"/" +
						bookingId
				);
				bookingData = {};
				bookingData.status = "confirmed";
				bookingData.by = by;
				bookingsRef.update(bookingData);
				res
					.status(200)
					.json({ response: "Booking confirmed.", bookingId: bookingId });
			} catch (ex) {
				console.log("exception in confirmBookin", ex);
				res.status(500).json({
					responseError: "Internal Server Error, try again.",
					bookingId: bookingId
				});
			}
		}
	);
	app.post(
		"/api/reserve",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			console.log(req.body);
			const bookingId = req.body.bookingId;
			const slot = req.body.slot;
			const date = req.body.date;
			const by = req.body.by;
			bookingsRef = firebaseDB.ref(
				bookingsRefString +
					"/" +
					date +
					"/" +
					date +
					"/" +
					slot +
					"/" +
					bookingId
			);
			bookingData = {};
			bookingData.by = by;
			bookingData.status = "reserved";
			try {
				//	bookingsRef.update(bookingData);
				res
					.status(200)
					.json({ response: "Booking reserved.", bookingId: bookingId });
			} catch (ex) {
				console.log("exception in confirmBookin", ex);
				res.status(500).json({
					responseError: "Internal Server Error, try again.",
					bookingId: bookingId
				});
			}
		}
	);
	app.post(
		"/api/cancelBooking",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			console.log(req.body);
			const bookingId = req.body.bookingId;
			const slot = req.body.slot;
			const date = req.body.date;
			const by = req.body.by;
			try {
				bookingsRef = firebaseDB.ref(
					bookingsRefString +
						"/" +
						date +
						"/" +
						date +
						"/" +
						slot +
						"/" +
						bookingId
				);
				bookingData = {};
				bookingData.by = by;
				bookingData.status = "canceled by restaurant";
				bookingsRef.update(bookingData);
				res
					.status(200)
					.json({ response: "Booking canceled", bookingId: bookingId });
			} catch (ex) {
				console.log("exception in cancelBooking", ex);
				res.status(500).json({
					responseError: "Internal Server Error, try again.",
					bookingId: bookingId
				});
			}
		}
	);
	app.post("/api/revokeBooking", (req, res) => {
		const bookingId = req.body.bookingId;
		const slot = req.body.slot;
		const date = req.body.date;
		const by = req.body.by;
		try {
			bookingsRef = firebaseDB.ref(
				bookingsRefString +
					"/" +
					date +
					"/" +
					date +
					"/" +
					slot +
					"/" +
					bookingId
			);
			bookingData = {};
			bookingData.by = by;
			bookingData.status = "canceled by user";

			bookingsRef.update(bookingData);
			res
				.status(200)
				.json({ response: "Booking revoked.", bookingId: bookingId });
		} catch (ex) {
			console.log("exception in revokeBooking", ex);
			res.status(500).json({
				responseError: "Internal Server Error, try again.",
				bookingId: bookingId
			});
		}
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
	app.post("/api/revokeAndRefundBooking", async (req, res) => {
		const bookingId = req.body.bookingId;
		const slot = req.body.slot;
		const date = req.body.date;
		const refundAmount = req.body.refundAmount;
		const by = req.body.by;
		try {
			bookingsRef = firebaseDB.ref(
				bookingsRefString +
					"/" +
					date +
					"/" +
					date +
					"/" +
					slot +
					"/" +
					bookingId
			);
		} catch (ex) {
			console.log("exception in rnrbooking", ex);
			res.status(500).json({
				responseError: "Internal Server Error, try again.",
				bookingId: bookingId
			});
		}
		bookingData = {};
		bookingData.by = by;
		bookingData.status = "canceled and refunded";
		if (req.user) {
			req.user.credits += refundAmount;
			try {
				await new User(req.user).save();
			} catch (ex) {
				console.log("exception in rnrbooking", ex);
				res.status(500).json({
					responseError: "Internal Server Error, try again.",
					bookingId: bookingId
				});
			}
			try {
				bookingsRef.update(bookingData);
				res.status(200).json({
					response: "Booking canceled and user refunded",
					bookingId: bookingId
				});
			} catch (ex) {
				req.user.credits -= refundAmount;
				new User(req.user).save();
				console.log("exception in confirmBookin", ex);
				res.status(500).json({
					responseError: "Internal Server Error, try again.",
					bookingId: bookingId
				});
			}
		} else {
			res
				.status(404)
				.json({ responseError: "User doesn't exist.", bookingId: bookingId });
		}
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
		const bookingId = shortid.generate();
		const { email, phone, slot, date, name, seats } = req.body;
		const userId = req.body.userId || shortId;
		bookingsRef = firebaseDB.ref(
			bookingsRefString + "/" + date + "/" + date + "/" + slot
		);
		bookingData = {};
		bookingData.status = "waiting";
		bookingData.email = email;
		bookingData.phone = phone;
		bookingData.name = name;
		bookingData.seats = seats;
		bookingData.bookingId = bookingId;
		bookingData.userId = userId;
		bookingData.by = "user";
		try {
			bookingsRef.child(bookingId).set(bookingData);
			res.status(200).send(bookingData);
		} catch (ex) {
			console.log("exception in requestBooking", ex);
			res
				.status(500)
				.json({ responseError: "Internal Server Error, try again." });
		}
	});
};
