const mongoose = require("mongoose");

const crimeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a unique emp_id"],
    },
});

module.exports = mongoose.model('crime', crimeSchema);