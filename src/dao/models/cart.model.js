const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: String,
                require: true
            },
            quantity: {
                type: Number,
                require: true
            }
        }
    ]
})

const CartModel = mongoose.model("carts", cartSchema);

module.exports = CartModel;
