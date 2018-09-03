const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
	credits: Number,
	email: String,
	googleId: String,
	name: String,
	password: String,
	phone: Number
});

mongoose.model("User", userSchema);
