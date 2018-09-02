const passport = require("passport");

module.exports = app => {
	app.post("/api/login", passport.authenticate("local-login"), (req, res) => {
		let currUser = {
			email: req.user.email,
			name: req.user.name
		};
		res.send(currUser);
	});
	app.post("/api/signup", passport.authenticate("local-signup"), (req, res) => {
		res.status(200).send("success");
	});

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
			res.redirect("/checkserver");
		}
	);

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});

	app.get("/api/currentUser", (req, res) => {
		res.send(req.user);
	});
};
