const Mongoose = require('mongoose');
const WorkReference = require('./WorkReference');

const BuilderSchema = new Mongoose.Schema({
	name: {
		type: String,
		maxLength: 100,
		required: true
	},
    origin_country: {
        type: String,
        maxLength: 100,
        required: true
    },
	work: {
        type: [WorkReference],
        required: true
    },
    description: {
        type: String,
        required: true
    },
	related_image: {
		type: String,
        default: null
	}
});

BuilderSchema.virtual('images_path').get(() => {
    return `/images/${this._id}`;
})

module.exports = Mongoose.model('builders', BuilderSchema);