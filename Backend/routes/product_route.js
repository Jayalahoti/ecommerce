const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const upload = require('../middleware/fileupload');
const ProductModel = mongoose.model("ProductModel");

//these add new sale entry in the db
router.post("/addproduct", upload.single("imageURL"), async (req, res) => {
  const { product, description, category, brand, price, stock } = req.body;
  const imageURL = req.file.filename;
  const productobj = new ProductModel({ product: product, imageURL: imageURL, category: category, brand: brand, description: description, price: price, stock: stock });
  productobj.save()
    .then((newproduct) => {
      res.status(201).json({ product: newproduct })
    })
    .catch((err) => {
      console.log(err);
    })
});

router.get('/allproducts', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({
      Allproducts: products
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.post('/review/:id', async (req, res) => {
  const { rating, comment } = req.body
  const product = await ProductModel.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.reviews
      .find(
        (r) => r.user.toString() === req.user._id.toString()
      )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }
    const review = {
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length
    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

router.get('/product/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    const productDoc = await ProductModel.findOne({ _id: productId });
    if (!productDoc) {
      res.status(404).json({
        message: `Cannot find Address with the id: ${productId}.`
      });
    }
    res.status(200).json({
      product: productDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get('/product/:category', async (req, res) => {
  try {
    const products = await ProductModel.find({ routeName: req.params["category"] });
    res.status(200).json({
      category: products
    });
  } catch (error) {
    res.status(400).json({
      error: `No products found with ${category}`
    });
  }
});

router.get('/deleteproduct/:id', async (req, res) => {
  try {
    const productDoc = await ProductModel.findByIdAndDelete(req.params.id);
    if (!productDoc) {
      res.status(404).json({
        message: `Cannot find Address with the id: ${req.params.id}.`
      });
    } else {
      res.status(200).json({success: "product deleted"})
    }
  } catch (error) {
    console.log(error);
  }
});

router.put('/editproduct/:id', async (req, res) => {
  try {
    const {product, description, price, stock} = req.body;
    const productDoc = await ProductModel.findOneAndUpdate({ _id: req.params.id }, 
      {product: product, description: description, price:price, stock: stock}, 
      { new: true });
    if (!productDoc) {
      res.status(404).json({
        message: `Cannot find Address with the id: ${req.params.id}.`
      });
    } else {
      res.status(200).json({success: "product updated"})
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;