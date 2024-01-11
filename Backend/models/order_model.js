const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "UserModel",
            required: true
        },
        address: {
            type: mongoose.Types.ObjectId,
            ref: "AddressModel",
            required: true
        },
        totalItems: {
            type: Number,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
)