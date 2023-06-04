const Mongoose = require('mongoose');

const WorkReferenceSchema = new Mongoose.Schema({
    name: {
        type: String,
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
    date: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    link: {
        type: String,
        default: null
    }
});

module.exports = Mongoose.model('work_references', WorkReferenceSchema);