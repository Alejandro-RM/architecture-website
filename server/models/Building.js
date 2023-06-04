const Mongoose = require('mongoose');

const BuildingSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre_and_typology: {
        type: String,
        maxLength: 200,
        required: true
    },
    actual_state: {
        type: String,
		maxLength: 100,
        required: true
    },
    build_date: {
        type: String,
        maxLength: 200,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    coordinates: {
        type: {
            latitude: Number,
            longitude: Number
        },
        default: {
            latitude: NaN,
            longitude: NaN
        }
    },
    stylistic_current: {
        type: String,
        required: true
    },
    // All these are going to be ContentTools output
    historical_context: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    materials_and_systems: {
        type: String,
        required: true
    },
    urban_context: {
        type: String,
        required: true
    },
    space_transformations: {
        type: String,
        required: true
    }
});

BuildingSchema.virtual('images_path').get(() => {
    return `/images/${this._id}`;
})

module.exports = Mongoose.model('buildings', BuildingSchema);