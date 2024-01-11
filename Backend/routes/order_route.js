const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const protectedResource = require('../middleware/protectedResource');
const OrderModel = mongoose.model("OrderModel");
const CartModel = mongoose.model("CartModel");
const AddressModel = mongoose.model("AddressModel");

router.post("/orderdetails", protectedResource, async(req, res) => {
    const {addressId, totalItems, totalAmount} = req.body;
    const cartItems = await CartModel.find();
    const address = await AddressModel.findById(addressId);
    const orderObj = new OrderModel({
        cartItems: cartItems, 
        totalAmount: totalAmount, 
        totalItems: totalItems, 
        address: address, 
        user: req.user});
    orderObj.save()
    .then((order) => {
        res.status(201).json( {order: order})
    })
    .catch((err) => {
        res.status(400).json({err: err})
    })
});

router.get("/order", protectedResource, async(req, res) => {
    try {
        const order = await OrderModel.find({user: req.user})
        res.status(200).json({order: order})
    } catch (error) {
        res.status(400).json({err:err});
    }
})

router.get("/allorders", async(req, res) => {
    try {
        const allorders = await OrderModel.find({})
        res.status(200).json({allorders: allorders})
    } catch (error) {
        res.status(400).json({err:err});
    }
})

module.exports = router;