const mongoose = require('mongoose')

const VisitorDataSchema = new mongoose.Schema({

    visitorName: {
        type: String,
        required: true
    },

    visitorFamilyName: {
        type: String,
        required: true
    },

    visitorDate:{
        type: Date,
        required: true
    },

    visitorHours: {
        type: String,
        required: true
    },

    visitorCreationDate: {
        type: Date,
        default: new Date()
    },

    visitorInstitution: {
        type: String,
        
    },

    visitorComment: {
        type: String,

    }

});

module.exports = mongoose.model('Products', VisitorDataSchema)