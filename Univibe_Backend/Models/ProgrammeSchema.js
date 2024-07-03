const mongoose = require('mongoose');

const programmeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    portraitImgUrl: {
        type: String,
        required: true
    },
    landscapeImgUrl: {
        type: String,
        required: true
    },
    theme: {
        type: [String], // You can store multiple themes as an array of strings
        required: true
    },

});

const Programme = mongoose.model('Programme', programmeSchema);

module.exports = Programme;
