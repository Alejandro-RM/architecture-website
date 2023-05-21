const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		maxLength: 100,
		required: [true, 'Users must have a username']
	},
	first_name: {
		type: String,
		maxLength: 100,
		required: [true, 'Users must have a first name']
	},
	last_name: {
		type: String,
		maxLength: 100,
		required: [true, 'Users must have a last name']
	},
	email: {
		type: String,
		maxLength: 100,
		required: [true, 'Users must have an email']
	},
	password: {
		type: Buffer,
		required: [true, 'Users must have a password']
	},
	salt: {
		type: Buffer,
		required: true
	},
	profile_image_path: {
		type: String
	},
	role: {
		type: String,
		enum: ['administrator', 'student', 'user'],
		default: 'user'
	}
});

UserSchema.virtual('full_name').get(() => {
	return this.first_name + ' ' + this.last_name;
});

module.exports = Mongoose.model('users', UserSchema);