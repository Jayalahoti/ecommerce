const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserModel = mongoose.model("UserModel");
var bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const protectedRoute = require('../middleware/protectedResource');

//helps register new customer
router.post('/signup', (req, res) => {
    const { fullname, email, password, confirm, isAdmin } = req.body;
    if (!fullname || !email || !password || !confirm) {
        return res.status(400).json({ error: "All fields required!" })
    }
    UserModel.findOne({ email: email })
        .then((userInDB) => {
            if (userInDB) {
                return res.status(500).json({ error: "Email already registered!" })
            }
            bcryptjs.hash(password, 16)
                .then((hashedPassword) => {
                    const user = new UserModel({ fullname, email, password: hashedPassword, confirm: hashedPassword, isAdmin: isAdmin });
                    if (password === confirm) {
                        user.save()
                            .then((newuser) => {
                                res.status(201).json({ result: newuser })
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    } else {
                        res.status(201).json({ error: "Please re-enter correct Password" });
                    }

                })
        })
        .catch((err) => {
            console.log(err);
        })
});

//login registered customer
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "All * fields required!" });
    }
    UserModel.findOne({ email: email })
        .then((userInDB) => {
            if (!userInDB) {
                return res.status(500).json({ error: "User doesn't exist!" })
            }
            bcryptjs.compare(password, userInDB.password)
                .then((didMatch) => {
                    if (didMatch) {
                        const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);
                        //const userInfo = { "email": userInDB.email, "fullname": userInDB.fullname, "isAdmin": userInDB };
                        res.status(200).json({ result: { token: jwtToken, user: userInDB} })
                    } else {
                        return res.status(401).json({ error: "Invalid credentials!" })
                    }
                })
        })
});

router.get('/userprofile/:id',async(req,res)=>{
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
          res.status(404).json({
            message: `Cannot find Address with the id: ${req.params.id}.`
          });
        }
        res.status(200).json({
          user:user
        });
      } catch (error) {
        res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }
})

router.post('/userprofile/:id', protectedRoute, (req, res) => {
    const { fullname,email,  password, confirm } = req.body;
    if (!fullname || !password || !confirm) {
        return res.status(400).json({ error: "All fields required!" })
    }
    UserModel.findOne({ email: email })
        .then((userInDB) => {
            if (!userInDB) {
                return res.status(500).json({ error: "Email not registered!" })
            }
            console.log("User In DB", userInDB);
            bcryptjs.hash(password, 16)
                .then((hashedPassword) => {
                    UserModel.findOneAndUpdate({ email: email },
                        { $set: { fullname: fullname, password: hashedPassword, confirm: hashedPassword } }, { upsert: false })
                        .then((user) => {
                            if (password === confirm) {
                                console.log(user);
                                user.save()
                                    .then((updateduser) => {
                                        return res.status(201).json({ result: updateduser })
                                    })
                            } else {
                                return res.status(201).json({ error: "Please re-enter correct Password" });
                            }
                        })
                })
        })
        .catch((err) => {
            console.log(err);
        })
});

router.get('/allusers', async (req, res) => {
    try {
      const users = await UserModel.find({});
      res.status(200).json({
        Allusers: users
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  });
  

router.delete('/deleteuser/:id', async(req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) {
          res.status(404).json({
            message: `Cannot find Address with the id: ${req.params.id}.`
          });
        }
      } catch (error) {
        console.log(error);
      }
});

router.put('/updateuser/:id', async (req, res) => {
    const {isAdmin} = req.body;
    const user = await UserModel.findOneAndUpdate({ _id: req.params.id }, {isAdmin: isAdmin}, { new: true });
    if (user) {
      res.status(200).json({
        message: 'User updated'
      });
    } else {
        console.log("error");
    }
  
})

module.exports = router;