const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
        default: null
    },
    user: {
        type: ObjectId,
        ref: 'User',
        default: null
    },
    rating: {
        type: Number,
        default: 0
    },
    comment: {
        type: String,
        required: true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('ReviewModel', reviewSchema);

