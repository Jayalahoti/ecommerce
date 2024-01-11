const mongoose = require('mongoose');
//import UserModel from "./models/user_model";
const userSchema = require('./models/user_model')
const User = mongoose.model("UserModel", userSchema)
//const UserModel = require('./models/user_model')
const users = require('./data/userData')

mongoose.connect("mongodb://127.0.0.1:27017/fashionmart");

mongoose.connection.on('connected', () => {
    console.log("DB Connected!");
});

const importData = async () => {
    try {
      await User.deleteMany({})
 
      const createdUsers = await User.insertMany(users)
 
      //const adminUser = createdUsers[0]._id
 
    //   const sampleProducts = products.map((product) => {
    //     return { ...product, user: adminUser }
    //   })
 
      //await Product.insertMany(sampleProducts)
 
      console.log('Data Imported!')
      process.exit()
    } catch (error) {
      console.error(`${error}`)
      process.exit(1)
    }
  }
 
  const destroyData = async () => {
    try {
    //   await Order.deleteMany()
    //   await Product.deleteMany()
      await User.deleteMany()
 
      console.log('Data Destroyed!')
      process.exit()
    } catch (error) {
      console.error(`${error}`)
      process.exit(1)
    }
  }
 
  if (process.argv[2] === '-d') {
    destroyData()
  } else {
    importData()
  }