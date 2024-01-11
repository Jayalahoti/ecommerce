const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ReviewModel = mongoose.model("ReviewModel");
const protectedRoute = require('../middleware/protectedResource');

router.post('/addreview', protectedRoute, async(req, res)=> {
    try {
        const user = req.user;
        const product = {product: req.params.productId}
        const review = new ReviewModel({
          ...req.body,
          user: user._ids,
          product
        });
        const reviewDoc = await review.save();
        res.status(200).json({
          success: true,
          message: `Your review has been added successfully and will appear when approved!`,
          review: reviewDoc
        });
      } catch (error) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }
});

router.get('/reviews', async(req, res)=> {
  try {
    const reviews = await ReviewModel.find({}).populate('productId')
    res.status(200).send({status: 'ok', reviews})
  } catch (err) {
    console.log(err)
    res.status(400).json({Error: err})
  }
})

module.exports = router;


