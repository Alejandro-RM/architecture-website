const Mongoose = require('mongoose');

const TeamSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: {
        // These are references to Users ID's
        type: [Mongoose.SchemaTypes.ObjectId],
        default: []
    },
    access_to: {
        // These represent references to editable content by the team
        type: [{
            reference: Mongoose.SchemaTypes.ObjectId, // ID
            to: {
                type: String,
                enum: [
                    'architect',
                    'architectural-space',
                    'builder',
                    'building'
                ],
                required: true
            } // Type: Model to which belongs this reference
        }],
        default: []
    }
});

module.exports = Mongoose.model('teams', TeamSchema);