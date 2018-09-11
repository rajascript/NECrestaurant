const mongoose = require("mongoose");
const Schema = mongoose.Schema;
requiredProperty = {
	type: String,
	required: true
};
requiredPropertyBoolean = {
	type: Boolean,
	default: false
};
let adminSchema = new Schema({
	username: requiredProperty,
	name: String,
	password: requiredProperty,
	empId: String,
	su: requiredPropertyBoolean,
	canDelete: requiredPropertyBoolean,
	canCreate: requiredPropertyBoolean,
	canUpdate: requiredPropertyBoolean
});

mongoose.model("Admin", adminSchema);
