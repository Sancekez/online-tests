const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	isActivated: {
		type: Boolean,
		default: false
	},
	activationLink: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true
	},
	surName: {
		type: String,
	},
})

const UserModel = mongoose.model('User', UserSchema);
module.exports.UserModel = UserModel;