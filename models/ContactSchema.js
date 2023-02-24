const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    
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
    timestamps: true
});

module.exports = mongoose.model('contacts', contactSchema);