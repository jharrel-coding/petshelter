const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        minLength: [3, 'Pets name must be at least 3 characters'],
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        minLength: [3, 'Pets type must be at least 3 characters'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [3, 'Pets description must be at least longer than 3 characters'],
    },
    skillOne: {
        type: String,
    },
    skillTwo: {
        type: String,
    },
    skillThree: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Pet', PetSchema);