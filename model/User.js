const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
	email: String,
	password: String
});

mongoose.model("User", userSchema);
