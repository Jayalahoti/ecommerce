const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CartModel = mongoose.model("CartModel");
const ProductModel = mongoose.model("ProductModel");
const protectedRoute = require('../middleware/protectedResource');

router.post("/addtocart/:id", protectedRoute, async (req, res) => {
    const {productId, count} = req.body;
    const product = await ProductModel.findOne({_id: productId});
    console.log(product);
  try {
    const cart = await CartModel.findOneAndUpdate(
      {_id:productId},
      {productId, count:count, userId: req.user._id},
      {upsert: true},
    )
    res.status(201).send({status: 'ok', cart})
  } catch (err) {
    console.log(err)
    res.status(400).json({Error: err})
  }
});

router.get("/cart", protectedRoute, async(req,res) => {
    try {
        const carts = await CartModel.find({userId: req.user._id}).populate('productId')
        res.status(200).send({status: 'ok', carts})
      } catch (err) {
        console.log(err)
        res.status(400).json({Error: err})
      }
});

router.delete("/deleteitem/:id", protectedRoute, async (req, res) => {
  try {
    const item = await CartModel.findByIdAndDelete(req.params.id)
    res.status(200).send({status: 'Item deleted', item})
  } catch (err) {
    console.log(err)
    res.status(400).json({Error: err})
  }
})

module.exports = router;