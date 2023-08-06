const mongoose = require("mongoose");

const crimeSchema = new mongoose.Schema({
    caseId: {
        type: Number,
        default: new Date().getTime(),
        required: [true, "Please enter crime Id"],
        unique: true,
    },
    incidentDetails: {
        type: String,
    },
    date: {
        type: Date,
    },
    stringDate: {
        type: String,
    },
    location: {
        type: String,
    },
    type: {
        type: String,
    },
    status: {
        type: String,
    },
    victim: {
        type: Object,
    },
    suspect: {
        type: String,
    },
    witness: {
        type: Object,
    },
    policeReport: {
        type: Object,
    },
    mediaReport: {
        type: Object,
    },
    dateMetaData: {
        type: Object
    }

});

module.exports = mongoose.model('crime', crimeSchema);