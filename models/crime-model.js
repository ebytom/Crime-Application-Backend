const mongoose = require("mongoose");

const crimeSchema = new mongoose.Schema({
    caseId: {
        type: String,
        unique: true,
        required: [true, "Please provide a case ID"],
    },
    incidentDetails:{
        type :String ,
    },
    date:{
        type:Date,
    },
    location:{
        type: String, 
    },
    type:{
        type: String,
    },
    status:{
        type: String,
    },
    victim:{
        type: Object,
    },
    suspect:{
        type: String,
    },
    witness:{
        type: Object,
    },
    policeReport:{
        type: Object,
    },
    mediaReport:{
        type: Object,
    }

});

module.exports = mongoose.model('crime', crimeSchema);