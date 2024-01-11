const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config.js');

mongoose.connect(MONGODB_URL);

mongoose.connection.on('connected', () => {
    console.log("DB Connected!");
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());

require('./models/user_model.js');
require('./models/address_model.js');
require('./models/product_model.js');
require('./models/cart_model.js');
require('./models/review_model.js');
require('./models/order_model.js');

app.use('/uploads',express.static('uploads'));
app.use(require('./routes/user_route.js'));
app.use(require('./routes/address_route.js'));
app.use(require('./routes/product_route.js'));
app.use(require('./routes/cart_route.js'));
app.use(require('./routes/review_route.js'));
app.use(require('./routes/order_route.js'));


app.listen(5000, () => {
    console.log("Server started!");
})

