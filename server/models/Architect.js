const Mongoose = require('mongoose');
const WorkReference = require('./WorkReference');

const ArchitectSchema = new Mongoose.Schema({
	first_name: {
		type: String,
		maxLength: 100,
		required: true
	},
	last_name: {
		type: String,
		maxLength: 100,
		required: true
	},
    studies_place: {
        type: String,
        default: null
    },
    career: {
        type: String,
        default: null
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

ArchitectSchema.virtual('full_name').get(() => {
	return `${this.first_name} ${this.last_name}`;
});

ArchitectSchema.virtual('images_path').get(() => {
    return `/images/${this._id}`;
})

module.exports = Mongoose.model('architects', ArchitectSchema);