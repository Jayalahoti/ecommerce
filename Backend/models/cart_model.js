// const mongoose = require('mongoose');
// const { CART_ITEM_STATUS } = require('../constants/cart_status');
// const { ObjectId } = require('mongodb');

// const cartItemSchema = new mongoose.Schema({
//     product: {
//         type: ObjectId,
//         ref: 'ProductModel'
//     },
//     quantity: {
//         type: Number,
//         default: 0
//     },
//     price: {
//         type: Number,
//         default: 0
//     },
//     total: {
//         type: Number,
//         default: 0
//     },
//     status: {
//         type: String,
//         default: CART_ITEM_STATUS.Not_processed,
//         enum: [
//             CART_ITEM_STATUS.Not_processed,
//             CART_ITEM_STATUS.Processing,
//             CART_ITEM_STATUS.Shipped,
//             CART_ITEM_STATUS.Delivered,
//             CART_ITEM_STATUS.Cancelled
//         ]
//     },

// });

// mongoose.model('CartItemModel', cartItemSchema);

// // Cart Schema
// const cartSchema = new mongoose.Schema({
//     products: [cartItemSchema],
//     user: {
//         type: ObjectId,
//         ref: 'UserModel'
//     },
//     updated: Date,
//     created: {
//         type: Date,
//         default: Date.now
//     }

// });

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'UserModel',
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'ProductModel',
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },

  },
  {
    timestamps: true,
  },
)

mongoose.model('CartModel', cartSchema);

const orderSchema = new mongoose.Schema(
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
    cartItems: [cartSchema],
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
);

mongoose.model("OrderModel", orderSchema);

