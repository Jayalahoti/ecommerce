const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AddressModel = mongoose.model("AddressModel");
const protectedRoute = require('../middleware/protectedResource');

//these add new sale entry in the db
router.post("/address", protectedRoute, (req, res) =>{
    const {fullname, address, city, postalcode, country} = req.body;
    if(!fullname || !address || !city || !postalcode || !country){
        return res.status(400).json({error: "All fields mandatory!"})
    }
    req.user.password = undefined;
    const addressobj = new AddressModel({fullname: fullname, address: address, city: city, postalcode: postalcode, country: country, author: req.user});
    addressobj.save()
    .then((newaddress) => {
        res.status(201).json( {address: newaddress})
    })
    .catch((err) => {
        console.log(err);
    })
});

router.get('/address/:id',protectedRoute, async (req, res) => {
    try {
      const addressId = req.params.id;
      console.log(addressId);
      const addressDoc = await AddressModel.findOne({ _id: addressId });
      if (!addressDoc) {
        res.status(404).json({
          message: `Cannot find Address with the id: ${addressId}.`
        });
      }
      res.status(200).json({
        address: addressDoc
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  });

module.exports = router;