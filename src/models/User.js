import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 40,
	},
	username: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		minlength: 7,
		maxlength: 100,
	},
	password: {
		type: String,
		required: true,
		select: false,
		minlength: 6,
		maxlength: 100,
	},
	avatar: {
		type: String,
		required: true,
	},
	coins: {
		type: Number,
		required: true,
	},
});

UserSchema.pre('save', async function (next) {
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

export const User = mongoose.model('users', UserSchema);
