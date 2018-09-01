var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var keys = require("./config/keys");
const mongoose = require("mongoose");
var app = express();

//mongoose setup
mongoose.connect(keys.mongooseURI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require("./routes/users")(app);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.send("42");
});

const port = process.env.PORT || 5000;
app.listen(port);
