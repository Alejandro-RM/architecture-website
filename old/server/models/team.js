const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	team_name: {
		type: String,
		maxLength: 100,
		required: [true, 'Team should have a name']
	},
    
    description:{ 
        type:String,
        maxLength: 100,
        required: [true, 'Team must have a brief description']
    },

    members: {
        type: String,
        maxLength: 100,
        required: [true, 'Members must be more than one']
    },

	team_photo_id: {
		type: Number
	}
});

module.exports = mongoose.model('team', UserSchema);