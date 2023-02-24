const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    phone: {
        type: Number,
        required: true
    },

}, {
    timestams: true
});

module.exports = mongoose.model('contacts', contactSchema);