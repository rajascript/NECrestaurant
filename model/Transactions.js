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
let transactionSchema = new Schema({
	id: requiredProperty,
	success: requiredPropertyBoolean
});

mongoose.model("Transaction", transactionSchema);
