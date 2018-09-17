var express = require("express");
const passport = require("passport");
var cookieSession = require("cookie-session");
var bodyParser = require("body-parser");
const firebase = require("firebase");
var keys = require("./config/keys");
const mongoose = require("mongoose");
var app = express();

//firebase config

var config = {
	apiKey: keys.firebaseApiKey,
	authDomain: keys.firebaseAuthDomain,
	databaseURL: keys.firebaseDatabaseURL
};
firebase.initializeApp(config);
const firebaseDB = firebase.database();

//firebase config
//app.use(cors);
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Authorization, Origin, Content-Type, Accept"
	);
	res.setHeader("Access-Control-Allow-Credentials", "true");
	next();
});
//mongoose setup
try {
	mongoose.connect(
		keys.mongooseURI,
		{ useNewUrlParser: true }
	);
} catch (err) {
	console.log("mongoose connection error.", err);
}
require("./model/User");
require("./model/Admin");
app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

//passport settings
app.use(passport.initialize());
app.use(passport.session());
require("./services/passport");

//routes config
require("./routes/adminRoutes")(app);
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/bookingRoutes")(app, firebaseDB);
app.disable("etag");

app.use(express.static("client/build"));

app.get("/checkserver", (req, res) => {
	res.send("42");
});

const port = process.env.PORT || 5000;
console.log("listening to port ", port);
app.listen(port);
