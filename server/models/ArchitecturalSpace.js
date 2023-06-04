const Mongoose = require('mongoose');

const ArchitecturalSpaceSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    use: {
        type: String,
        required: true
    },
    builder: {
        type: String,
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
    // All these are going to be ContentTools output
    historical_context: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    design_principles: {
        type: String,
        required: true
    },
    importance: {
        type: String,
        required: true
    },
    space_transformations: {
        type: String,
        required: true
    }
});

module.exports = Mongoose.model('architectural_spaces', UserSchema);