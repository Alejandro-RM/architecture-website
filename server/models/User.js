const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
	first_name: {
		type: String,
		maxLength: 100
	},
	last_name: {
		type: String,
		maxLength: 100
	},
	email: {
		type: String,
		maxLength: 100,
        unique: true
	},
    account_number: {
        type: Number,
        required: true,
        unique: true
    },
	profile_image: {
		type: String,
        default: null
	},
	role: {
		type: String,
		enum: ['administrator', 'user'],
		default: 'user'
	},
	password: {
		type: Buffer,
		required: true
	},
	salt: {
		type: Buffer,
		required: true
	}
});

UserSchema.virtual('full_name').get(() => {
	return `${this.first_name} ${this.last_name}`;
});

UserSchema.virtual('images_path').get(() => {
    return `/images/${this._id}`;
})

module.exports = Mongoose.model('users', UserSchema);