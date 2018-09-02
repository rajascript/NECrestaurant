const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
	credits: Number,
	email: String,
	googleId: String,
	password: String,
	name: String
});

mongoose.model("User", userSchema);
