const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalcode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'UserModel'
    }
});

mongoose.model('AddressModel', addressSchema);