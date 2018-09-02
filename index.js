var express = require("express");
const passport = require("passport");
var cookieSession = require("cookie-session");
var bodyParser = require("body-parser");
var keys = require("./config/keys");
const mongoose = require("mongoose");
var app = express();

//mongoose setup
mongoose.connect(
	keys.mongooseURI,
	{ useNewUrlParser: true }
);
require("./model/User");

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

require("./routes/authRoutes")(app);

app.use(express.static("client/build"));

app.get("/checkserver", (req, res) => {
	res.send("42");
});

const port = process.env.PORT || 5000;
console.log("listening to port ", port);
app.listen(port);
