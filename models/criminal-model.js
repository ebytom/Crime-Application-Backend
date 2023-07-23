const mongoose = require("mongoose");

const criminalSchema = new mongoose.Schema({
    criminalId: {
        type: String,
        required: [true, "Please enter criminal id"],
        unique: true,
    },
    entryDate: {
        type: Date,
        default: new Date(Date.now()),
    },
    fullName: {
        type: String,
        required: [true, "Please enter criminal name"],
    },
    dob: {
        type: Date,
    },
    address: {
        type: String,
    },
    profileFileName: {
        type: String,
    },
    physicalCharacteristics: {
        type: Object,
    },
    crimeDetails: {
        type: String,
        required: [true, "Please enter crime details"],
    },
    courtInformation: {
        type: String,
    },
    courtInformation: {
        type: String,
    },
    probationStatus: {
        type: String,
    }
});

module.exports = mongoose.model('criminal', criminalSchema);