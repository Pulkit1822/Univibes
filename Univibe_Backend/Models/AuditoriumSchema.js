const mongoose = require('mongoose');

const auditoriumSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    seats: {
        type: Array,
        required: true
    },
    campus: {
        type: String,
        required: true
    },
    auditoriumType: {
        type: String,
        required: true
    },
    programmeSchedules: [
        {
            programmeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Programme', // Reference to the Programme model
                required: true
            },
            showTime: String,
            notAvailableSeats: [{
                row : String,
                col : Number,
                seat_id : String,
                price : Number
                
            }],
            showDate: Date
        }
    ]
});

const Auditorium = mongoose.model('Auditorium', auditoriumSchema);

module.exports = Auditorium;
