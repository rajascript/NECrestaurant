const mongoose = require("mongoose");
const Schema = mongoose.Schema;
requiredProperty = {
	type: String,
	required: true
};

let userSchema = new Schema({
	credits: Number,
	email: requiredProperty,
	googleId: String,
	name: String,
	password: String,
	phone: Number
});

mongoose.model("User", userSchema);
