const mongoose = require("mongoose");

const criminalSchema = new mongoose.Schema({
    criminalId: {
        type: Number,
        default: new Date().getTime(),
        required: [true, "Please enter criminal id"],
        unique: true,
    },
    entryDate: {
        type: Date,
        default: new Date(Date.now()),
    },
    name: {
        type: String,
        required: [true, "Please enter criminal name"],
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    physicalCharacteristics: {
        type: Object,
    },
    crimeDetails: {
        type: String,
        required: [true, "Please enter crime details"],
    },
    arrestedOn:{
        type: Date,
    },
    courtInformation: {
        type: String,
    },
    probationStatus: {
        type: String,
    },
    criminalPhotoFileName: {
        type: String,
    },
});

module.exports = mongoose.model('criminal', criminalSchema);