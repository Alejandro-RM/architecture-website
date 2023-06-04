const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuildingSchema = new Schema({
	name: {
		type: String,
		maxLength: 100,
		required: [true, 'Buildings must have a name']
	},
	typology: {
		type: String,
		maxLength: 100
	},
	actual_state: {
		type: String,
		maxLength: 100
	},
	building_time: {
		type: String,
		maxLength: 100
	},
    builders: {
        type: [String],
        default: 'Unknown'
    },
    location: {
        type: String
    },
    coordinates: {
		type: String
	},
    brief_description: {
        type: String,
        required: [true, 'Buildings must have a brief description']
    },
    description: {
        type: String,
        required: [true, 'Buildings must have a description']
    },
    images_paths: {
        type: [String]
    }
});

module.exports = mongoose.model('buildings', BuildingSchema);