const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const requireLogin = require("../middlewares/requireLogin");
module.exports = app => {
	app.post("/api/login", passport.authenticate("local-login",{
	
		failureRedirect: "/loginfailurejson"
	}), (req, res) => {
		console.log("hitting login");
		let currUser = {
			email: req.user.email,
			name: req.user.name,
			credits: req.user.credits
		};
		res.send(currUser);
	});
	app.get("/failurejson", function(req, res) {
		res.json({ message: "signup failed" });
	});

	app.get("/loginfailurejson", function(req, res) {
		res.json({ message: "login failed" });
	});
	
	// app.post("/api/signup", function(req, res, next) {
	// 	passport.authenticate("local-signup", async function(err, user, info) {
	// 		if (err) {
	// 			console.log(err);
	// 			next(err);
	// 		}
	// 		savedUser = await User.findOne({ email: req.user.email });
	// 		savedUser.name = req.body.name;
	// 		savedUser.phone = req.body.phone;
	// 		savedUser.save();
	// 		res.status(200).send("success");
	// 	})(req, res, next);
	// });
	app.post(
		"/api/signup",
		passport.authenticate("local-signup", {
			session: false,
			failureRedirect: "/failurejson"
		}),
		async (req, res) => {
			savedUser = await User.findOne({ email: req.user.email });
			savedUser.name = req.body.name;
			savedUser.phone = req.body.phone;
			savedUser.save();
			res.status(200).json({message:"success"});
		}
	);

	app.get(
		"/api/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"]
		})
	);

	app.get(
		"/auth/google/callback",
		passport.authenticate("google"),
		(req, res) => {
			res.redirect("/");
		}
	);

	app.get("/api/logout", requireLogin, (req, res) => {
		req.logout();
		res.status(200).send({});
	});

	app.get("/api/current_user", requireLogin, (req, res) => {
		const currUser = {};
		if (req.user) {
			currUser.email = req.user.email;
			currUser.credits = req.user.credits;
			currUser.name = req.user.name;
		}
		res.status(200).send(currUser);
	});
};
