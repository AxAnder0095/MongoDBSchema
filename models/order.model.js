import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;