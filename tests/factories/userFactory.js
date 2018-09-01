const mongoose = require("mongoose");
require("../../model/User");
const User = mongoose.model("User");

module.exports = () => {
	return new User({}).save();
};
