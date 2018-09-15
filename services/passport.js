const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const keys = require("../config/keys");

const User = mongoose.model("User");
const Admin = mongoose.model("Admin");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({
				email: profile.emails[0].value
			});

			if (existingUser) {
				if (existingUser.googleId === null) {
					//he already has an account just update google info
					const user = existingUser;
					user.googleId = profile.id;
					user.name = profile.displayName;
					await new User(user).save();
					return done(null, user);
				} else return done(null, existingUser);
			} else {
				const user = await new User({
					googleId: profile.id,
					email: profile.emails[0].value,
					name: profile.displayName,
					credits: 100
				}).save();
				done(null, user);
			}
		}
	)
);

passport.use(
	"local-signup",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true
		},
		async (req, email, password, done) => {
			if (!performPhoneCheck(Number(req.body.phone))) {
				return done(true, false, { message: "Phone error" });
			}
			if (!performStringCheck(req.body.name))
				return done(true, false, { message: "Name error" });
			if (!performEmailCheck(req.body.email))
				return done(true, false, { message: "Email error" });
			if (!performPasswordCheck(req.body.password))
				return done(true, false, { message: "Password error" });
			try {
				const existingUser = await User.findOne({ email: email });
				if (existingUser) {
					return done(null, false, { message: "User already exists" });
				}
				bcrypt.hash(password, saltRounds, async function(err, hash) {
					if (err) return done(err, null);
					let newUser = {
						email: email,
						password: hash,
						credits: 100
					};
					const user = await new User(newUser).save();
					return done(null, user);
				});
			} catch (err) {
				return done(err, null);
			}
		}
	)
);

passport.use(
	"local-login",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true
		},
		async (req, email, password, done) => {
			try {
				if (!performEmailCheck(email)) return done(null, false);
				if (!performPasswordCheck(password)) return done(null, false);
				const existingUser = await User.findOne({ email: email });
				if (existingUser) {
					bcrypt.compare(password, existingUser.password, function(err, res) {
						if (err) return done(err, false);
						if (!res) return done(null, false);
						return done(null, existingUser);
					});
				} else return done(null, false);
			} catch (err) {
				return done(err, false);
			}
		}
	)
);

passport.use(
	"admin-login",
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
			passReqToCallback: true
		},
		async (req, username, password, done) => {
			try {
				if (!performStringCheck(username)) return done(null, false);
				if (!performPasswordCheck(password)) return done(null, false);
				const existingAdmin = await Admin.findOne({ username });
				if (existingAdmin) {
					bcrypt.compare(password, existingAdmin.password, function(err, res) {
						if (err) return done(err, false);
						if (!res) return done(null, false);
						return done(null, existingAdmin);
					});
				} else return done(null, false);
			} catch (err) {
				return done(err, false);
			}
		}
	)
);

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: keys.jwtKey
		},
		async (jwtPayload, done) => {
			try {
				const user = await Admin.findOne({ _id: jwtPayload.id });

				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			} catch (err) {
				done(err, null);
			}
		}
	)
);

function performStringCheck(val) {
	if (typeof val !== "string" || val === null || typeof val === "undefined")
		return false;
	return true;
}
function performPhoneCheck(val) {
	if (typeof val !== "number" || val === null || typeof val === "undefined") {
		return false;
	}
	if (val.toString().split("").length !== 10) {
		return false;
	}
	return true;
}
function performEmailCheck(val) {
	if (typeof val !== "string" || val === null || typeof val === "undefined")
		return false;
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(val).toLowerCase());
}

function performPasswordCheck(val) {
	if (typeof val !== "string" || val === null || typeof val === "undefined")
		return false;
	if (val.split("").length < 5) return false;
	return true;
}
